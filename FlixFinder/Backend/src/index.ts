/////////////
// Imports //
/////////////

// General
import express from "express";
import dotenv from "dotenv";

// Database
import mongoose from "mongoose";
import User from "./user.model";
import { IUser } from "./types";

// Authentication
import cors from "cors";
import passport from "passport";
import session from "express-session";

// Twitter
import { Client, auth } from "twitter-api-sdk";
import needle from "needle";

// IBM Watson
import IBMwatson from "ibm-watson/natural-language-understanding/v1"
import { IamAuthenticator } from "ibm-watson/auth";

dotenv.config();

const app = express();

////////////////
// Middleware //
////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

//////////////
// Database //
//////////////

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

////////////////////
// Authentication //
////////////////////

const TwitterStrategy = require('passport-twitter').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done: any) => {
    return done(null, user._id);
})

passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: Error, doc: IUser) => {
      return done(null, doc);
    })
})

passport.use(new TwitterStrategy({
    consumerKey: `${process.env.TWITTER_CONSUMERKEY}`,
    consumerSecret: `${process.env.TWITTER_CONSUMERSECRET}`,
    callbackURL: `http://localhost:4000/auth/twitter/callback`
    }, async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        try {
            const user = await User.findOne({ twitterId: profile.id });
            if (!user) {
                const newUser = new User({
                    twitterId: profile.id,
                    username: profile.username,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                await newUser.save();
                cb(null, newUser);
            } else {
                cb(null, user);
            }
        } catch(err) {
            cb(err, null);
        }
    })
);

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/error', session: true }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(`http://localhost:3000/user`);
    });

app.get("/getuser", (req, res) => {
    res.send(req.user);
})

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout(function (err) {
            if (err) {
                return err;
            } else {
                res.send("done");
            }
        })
    }
});

/////////////////
// Twitter API //
// //////////////

const authClient = new auth.OAuth2User({
    client_id: `${ process.env.TWITTER_CONSUMERKEY }`,
    client_secret: `${ process.env.TWITTER_CONSUMERSECRET }`,
    callback: "http://127.0.0.1:3000/callback",
    scopes: ["tweet.read", "users.read", "offline.access"],
});
  
const client = new Client(authClient);

app.get('/user/:id', async (req: any, res: any) => {
    const url = `https://api.twitter.com/2/users/${req.params.id}/tweets`;
    const params = { "max_results": 10 }
    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${process.env.TWITTER_BEARERTOKEN}`
        }
    }
    try {
        const resp = await needle('get', url, params, options);
        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        } else {
            const timeline = resp.body.data;
            const tweets = timeline.map((tweet: any) => tweet.text).join('');

            ////////////////
            // IBM Watson //
            ////////////////

            const nlu = new IBMwatson({
                version: '2022-04-07',
                authenticator: new IamAuthenticator({
                  apikey: `${process.env.WATSON_APIKEY}`,
                }),
                serviceUrl: `${process.env.WATSON_SERVICE_URL}`,
            });
            
            // const analyzeParams = {
            //     'text': tweets,
            //     'features': {
            //         'concepts': {
            //             'limit': 3
            //         }
            //     }
            // };

            // nlu.analyze(analyzeParams)
            // .then((analysisResults: any) => {
            //     console.log(JSON.stringify(analysisResults, null, 2));
            // })
            // .catch((err: any) => {
            //     console.log('error:', err);
            // });
            res.send(tweets);
        }
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
})






///////////////
// Prototype //
///////////////

// app.get('/api/:movies', async (req, res) => {
//     const searchTerm = req.params.movies;
//     const url = `http://www.omdbapi.com/?s=%s&apikey=${process.env.OMDB_APIKEY}`;
//     const searchRequest = url.replace("%s", searchTerm);
//     request(searchRequest, function (error, response, body) {
//         res.send(body);
//     });
// });

//////////
// Port //
//////////

const port = 4000 || 4001;
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`)
});