const express = require('express');
const request = require('request');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.get('/api/:movies', async (req, res) => {
    const searchTerm = req.params.movies;
    const url = "http://www.omdbapi.com/?s=%s&apikey=bcb7b6f5";
    const searchRequest = url.replace("%s", searchTerm);
    request(searchRequest, function (error, response, body) {
        res.send(body);
    });
});


// DATABASE
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/flixDB';
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// user database
const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});