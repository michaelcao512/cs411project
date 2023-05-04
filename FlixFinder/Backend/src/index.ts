import express from "express";
import session from "express-session";
import mongoose, {ConnectOptions} from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import request from "request";
import User from "./user.model";
import usersRouter from './user.router';
import { IUser } from "./types";

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

////////////////////////////
// Twitter Authentication //
////////////////////////////

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
    passport.authenticate('twitter', { failureRedirect: '/error' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000');
    });

app.get("/getuser", (req, res) => {
    res.send(req.user);
})

////////////////
// IBM Watson //
////////////////

const IBMwatson = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const nlu = new IBMwatson({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: `${process.env.WATSON_APIKEY}`,
    }),
    serviceUrl: `${process.env.WATSON_SERVICE_URL}`,
});

const analyzeParams = {
    'url': "www.ibm.com",
    'features': {
        'concepts': {
            'limit': 3
        }
    }
};

nlu.analyze(analyzeParams)
    .then((analysisResults: any) => {
        console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch((err: any) => {
        console.log('error:', err);
    });
 
//////////////
// Database //
//////////////

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
  .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/users', usersRouter);

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
