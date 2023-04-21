const express = require('express');
const request = require('request');

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

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});