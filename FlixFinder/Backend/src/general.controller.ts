import { Request, Response } from "express";
import User from "./user.model";

const fetchTwitterFeed = async (userID: string) => {
    console.log("FETCH TWITTER FEED");
    await User.findById(userID)
        .then(user => {
            var accessToken = user.accessToken;
            var refreshToken = user.refreshToken;

            var feed: string[] = [];

            // TODO: call twitter api to get feed from username
            return feed

        })
        .catch(() => {
            return null;
        });
};

const analyzeEmotions = async (feed: string[], userID: string) => {
    console.log("ANALYZE EMOTIONS");
    var emotions: string[] = [];
    // TODO: call ibm watson api to analyze emotions from feed and store in emotions
    console.log("TODO: watson api call to analyze emotions from feed")


    // storing emotions in database and returnng emotions if succesful
    const filter = { _id: userID };
    const query = { $set: emotions };
    await User.updateOne(filter, query)
        .then(result => {
            if (result.modifiedCount === 0) {
                return null;
            }
            return emotions
        })
        .catch(() => {
            return null;
        });
};

const convertEmotionsToGenres = async (userID: string) => {
    console.log("CONVERT EMOTIONS TO GENRES");
    const filter = { _id: userID };
    const query = { _id: 0, emotion: 1 };
    var joyScore = 0, sadnessScore = 0, fearScore = 0, disgustScore = 0, angerScore = 0;
    await User.findById(filter, query)
        .then(user => {
            if (user === null) {
                return null;
            }
            joyScore = user.emotion.joy;
            sadnessScore = user.emotion.sadness;
            fearScore = user.emotion.fear;
            disgustScore = user.emotion.disgust;
            angerScore = user.emotion.anger;
        })
        .catch(() => {
            return null;
        });

    // Convert emotions to genres algorithm
    var genres: Number[] = [];

    // Define the genre weights and associated emotion levels in arrays
    var genreIndex = [16, 10402, 10751, 10749, 35, 14, 12, 36, 18, 878, 28, 10752, 37, 9648, 27, 80, 53];
    // each genre id value corresponds to a genre in the movie database
    var joyLevels = [0.495, 0.49, 0.465, 0.43, 0.4, 0.35, 0.35, 0.33, 0.33, 0.27, 0.24, 0.235, 0.23, 0.23, 0.215, 0.21, 0.205];
    var sadnessLevels = [0.205, 0.255, 0.25, 0.28, 0.265, 0.275, 0.255, 0.29, 0.315, 0.275, 0.28, 0.315, 0.29, 0.315, 0.3, 0.295, 0.315];
    var fearLevels = [0.12, 0.08, 0.1, 0.09, 0.115, 0.14, 0.135, 0.12, 0.12, 0.18, 0.16, 0.16, 0.135, 0.175, 0.225, 0.14, 0.18];
    var disgustLevels = [0.065, 0.08, 0.08, 0.09, 0.095, 0.1, 0.11, 0.12, 0.105, 0.115, 0.135, 0.125, 0.155, 0.13, 0.11, 0.17, 0.14];
    var angerLevels = [0.115, 0.095, 0.105, 0.11, 0.125, 0.135, 0.15, 0.14, 0.13, 0.16, 0.185, 0.165, 0.19, 0.15, 0.15, 0.185, 0.16];

    var genreDifference = [];
    for (var i = 0; i < genreIndex.length; i++) {
        genreDifference[i] = (Math.abs(joyLevels[i] - joyScore) + Math.abs(sadnessLevels[i] - sadnessScore) + Math.abs(fearLevels[i] - fearScore) + Math.abs(disgustLevels[i] - disgustScore) + Math.abs(angerLevels[i] - angerScore));
    }
    // get the index of the top 3 genres
    var first = Number.MAX_VALUE;
    var second = Number.MAX_VALUE;
    var third = Number.MAX_VALUE;
    var firstIndex = 0;
    var secondIndex = 0;
    var thirdIndex = 0;
    for (var i = 0; i < genreDifference.length; i++) {
        if (genreDifference[i] < first) {
            third = second;
            thirdIndex = secondIndex;
            second = first;
            secondIndex = firstIndex;
            first = genreDifference[i];
            firstIndex = i;
        }
        else if (genreDifference[i] < second) {
            third = second;
            thirdIndex = secondIndex;
            second = genreDifference[i];
            secondIndex = i;
        }
        else if (genreDifference[i] < third) {
            third = genreDifference[i];
            thirdIndex = i;
        }
    }
    genres[0] = genreIndex[firstIndex];
    genres[1] = genreIndex[secondIndex];
    genres[2] = genreIndex[thirdIndex];

    // Store genres in database
    const genreJson = { genres: genres };
    const query2 = { $set: {genres: genres} };

    await User.updateOne(filter, query2)
        .then(result => {
            if (result.modifiedCount === 0) {
                console.log("Error: could not store genres in database")
                return null;
            }
            return genres
        })
        .catch(() => {
            return null;
        });

    return genres;
};

const fetchMovieRecommendations = async (userID: string) => {
    console.log("FETCH MOVIE RECOMMENDATIONS");
    const filter = { _id: userID };
    const query = { _id: 0, emotion: 1 };
    var genres = {};
    await User.findById(filter, query)
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

export { fetchTwitterFeed, analyzeEmotions, convertEmotionsToGenres, fetchMovieRecommendations };