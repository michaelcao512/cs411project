import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "./user.model";
import Twitter from "twitter";

dotenv.config();

/////////////////
// Twitter API //
/////////////////

const client = new Twitter({
    consumer_key:  `${process.env.TWITTER_CONSUMERKEY}`,
    consumer_secret: `${process.env.TWITTER_CONSUMERSECRET}`,
    access_token_key: 'access token',
    access_token_secret: 'access token secret'
})

const fetchTwitterFeed = (userID: string) => {
    console.log("FETCH TWITTER FEED");
    User.findById(userID)
        .then(user => {
            request.get({
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                oauth: {
                  consumer_key:,
                  consumer_secret: ,
                  token: user.accessToken,
                  token_secret: user.refreshToken
                },
                qs: {
                  screen_name: user.username, // the screen name of the user whose timeline you want to retrieve
                  count: 100 // the number of tweets to retrieve
                }
              }, function(err, response, body) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(JSON.parse(body));
                }
              });
        })
        .catch( (err) => {
            return err;
        });
};

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

const analyzeEmotions = (feed: string[], userID: string) => {
    console.log("ANALYZE EMOTIONS");
    var emotions: string[] = [];
    // TODO: call ibm watson api to analyze emotions from feed and store in emotions
    console.log("TODO: watson api call to analyze emotions from feed")

    // storing emotions in database and returnng emotions if succesful
    const filter = { _id: userID };
    const query = { $set: emotions };
    User.updateOne(filter, query)
      .then(result => {
        if (result.modifiedCount === 0) {
          return null;
        }
        return emotions
    });
};

const convertEmotionsToGenres = (userID: string) => {
    console.log("CONVERT EMOTIONS TO GENRES");
    const filter = { _id: userID };
    const query = { _id:0, emotion:1 };
    var emotion = {};
    User.findById(filter, query)
    .then(result => {
        if (result === null) {
            return null;
        }
        emotion = result.emotion;
    });

    var genres: string[] = [];
    // TODO: convert emotions to genres algorithm
    console.log("TODO: convert emotions to genres algorithm");
    return genres;
};

const fetchMovieRecommendations = (userID: string) => {
    console.log("FETCH MOVIE RECOMMENDATIONS");
    const filter = { _id: userID };
    const query = { _id:0, emotion:1 };
    var genres = {};
    User.findById(filter, query)
    .then(result => {
        if (result === null) {
            return null;
        }
        genres = result.genres;
    });

    var movieRecommendation: any[] = [];
    // TODO: call movie api to get movie recommendations from genres
    console.log("TODO: call movie api to get movie recommendations from genres");

    return movieRecommendation;
}

export { fetchTwitterFeed, analyzeEmotions, convertEmotionsToGenres, fetchMovieRecommendations};