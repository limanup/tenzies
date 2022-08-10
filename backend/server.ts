import { db, localdb, port } from "./database/db";
import * as path from "path";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import recordRoute from "./routes/record.route";

// Configure mongoDB Database
// no need to configure as we are using mondodb v6
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

const app = express();

// Connecting mongoDB database
// mongoose.Promise = global.Promise;
mongoose.connect(db).then(
    () => {
        console.log("Database successfully connected!");
    },
    (error) => {
        console.log("Could not connect to database : " + error);
    }
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

// Have Node serve the files foir our built React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// // for testing
// app.get('/', (req, res) => {
//     res.send(`<h1>API works.</h1>`)
// })

// base route is /leaderboard, to handle GET, POST requests
app.use("/leaderboard", recordRoute);

// All other GET request not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// PORT
const server = app.listen(port, () => {
    console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
    res.status(404).send("Error 404!");
});

// error handler
// https://expressjs.com/en/guide/error-handling.html
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    res.status(500).send(err.message);
});
