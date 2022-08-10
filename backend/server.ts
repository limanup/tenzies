import { db, port } from "./database/db";
import * as path from "path";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import recordRoute from "./routes/record.route";

const app = express();

// Connecting mongoDB database
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

// base route to handle all API requests
app.use("/api", recordRoute);

// Have Node serve the files for the built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// All other GET request not handled before will return the React app
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
