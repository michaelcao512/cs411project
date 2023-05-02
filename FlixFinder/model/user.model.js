
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    accesstoken: String,
    refreshtoken: String,

    emotions: [String],
    genres: [String],

    movies: [{
        title: String,
        year: String,
        poster: String,
        imdbID: String,
        plot: String,
        genre: String,
        emotion: String,
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;