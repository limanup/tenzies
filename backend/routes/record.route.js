// import mongoose from "mongoose";
// import express from "express";
// import {recordSchema, RecordModel} from "../Models/Record";
// import { nextTick } from "process";

let mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// record Model
let RecordModel = require("../Models/Record");

// Router().post('/leaderboard', (req, res, next) => {
//     console.log(req)
//     console.log(res)
//     console.log(next)
// })

// get best record
app.get("/bestrecord", (req, res, next) => {
    RecordModel.findOne((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
        // only 1 best record
    }).sort({ totalTimeUsed: 1 });
});

// Add record
app.post("/", (req, res, next) => {
    RecordModel.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            console.log(data)
            res.json(data);
        }
    });
});

// Read record
app.get("/", (req, res, next) => {
    RecordModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
        // sort table by total time used asec
    }).sort({ totalTimeUsed: 1 });
});

// export default app;
module.exports = app;
