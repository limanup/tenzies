// import mongoose from "mongoose";
// import express from "express";
// import {recordSchema, RecordModel} from "../Models/Record";
// import { nextTick } from "process";

let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// record Model
let recordSchema = require("../Models/Record");

// Router().post('/leaderboard', (req, res, next) => {
//     console.log(req)
//     console.log(res)
//     console.log(next)
// })

// Add record
router.post("/", (req, res, next) => {
    console.log("post sucess");
    recordSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

// Read record
router.get("/", (req, res) => {
    console.log("get success");
    recordSchema
        .find((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
        .sort({ totalTimeUsed: 1 });
});

// export default router;
module.exports = router;
