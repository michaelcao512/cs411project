import { Request, Response } from "express";
import User from "./user.model";

const fetchTwitterFeed = (userID: string) => {
    console.log("FETCH TWITTER FEED");
    User.findById(userID)
        .then(user => {
            var accesstoken = user.accesstoken;
            var refreshtoken = user.refreshtoken;

            var feed: string[] = [];

            // TODO: call twitter api to get feed from username


        })
        .catch( () => {
            return null;
        });
    };

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