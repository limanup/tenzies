import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { db, localdb, port } from "./database/db";

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
// base route is /leaderboard
app.use("/leaderboard", recordRoute);



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
    console.error("Error name:", err.name)
    console.error("Error message:", err.message);
    res.status(500).send(err.message);
});
