import express from "express";
import request from "request";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

//////////////
// DATABASE //
//////////////

mongoose.connect(`${process.env.DATABASE_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = 5000;
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`)
});