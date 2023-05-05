import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
// import request from "request";
import User from "./user.model";
import { IUser } from "./types";
import userRouter from './user.router';

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

app.use('/users', userRouter);

//////////////
// Database //
//////////////

const mongoURI = "mongodb+srv://ken:cs411project@cluster0.q7wod0n.mongodb.net/?retryWrites=true&w=majority";
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
        res.redirect(`http://localhost:3000/results`);
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