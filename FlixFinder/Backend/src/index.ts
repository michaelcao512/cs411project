// const IBMwatson = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import request from "request";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());


// IBM Watson
// const nlu = new IBMwatson({
//     version: '2022-04-07',
//     authenticator: new IamAuthenticator({
//       apikey: 'S3Q0C2vu_1InDR3eRzptRo4pH5Xr_7C_egqdKLppdzDK',
//     }),
//     serviceUrl: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/83b8475b-34b2-496e-8571-1fa84d27ae69',
// });

// const analyzeParams = {
//     'url': "www.ibm.com",
//     'features': {
//         'concepts': {
//             'limit': 3
//         }
//     }
// };

// nlu.analyze(analyzeParams)
//     .then(analysisResults => {
//         console.log(JSON.stringify(analysisResults, null, 2));
//     })
//     .catch(err => {
//         console.log('error:', err);
//     });

// DATABASE
const mongoURI = 'mongodb://localhost:27017/flixDB';
// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
    .then(conn => console.log(`MongoDB connected: ${conn.connection.host}`))
    .catch(err => console.log(err));

// user database
import usersRouter from './user.router';
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

// Code for the prototype
app.get('/api/:movies', async (req, res) => {
    const searchTerm = req.params.movies;
    const url = `http://www.omdbapi.com/?s=%s&apikey=${process.env.OMDB_APIKEY}`;
    const searchRequest = url.replace("%s", searchTerm);
    request(searchRequest, function (error, response, body) {
        res.send(body);
    });
});