const express = require('express');
const request = require('request');
const dotenv = require('dotenv').config();
const IBMwatson = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


const app = express();
app.use(express.json());

const nlu = new IBMwatson({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: 'S3Q0C2vu_1InDR3eRzptRo4pH5Xr_7C_egqdKLppdzDK',
    }),
    serviceUrl: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/83b8475b-34b2-496e-8571-1fa84d27ae69',
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
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
  

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



const port = process.env.PORT || 5001;
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`)
});