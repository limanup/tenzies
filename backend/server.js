// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import {db} from "./database/db";

// import recordRoute from "./routes/record.route";'

let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");

// Express Route
const recordRoute = require("../backend/routes/record.route");

// Configure mongoDB Database
// no need to configure as we are using mondodb v6
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

// Connecting mongoDB database
mongoose.Promise = global.Promise;
mongoose
    .connect(dbConfig.db)
    .then(
        () => {
            console.log("Database successfully connected!");
        },
        (error) => {
            console.log("Could not connect to database : " + error);
        }
    );

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use("/leaderboard", recordRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
    res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


