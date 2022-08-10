import { Router } from "express";
import RecordModel from "../Models/Record";

const router = Router();

// Read record
router.get("/leaderboard", async (req, res, next) => {
    await RecordModel.find()
        .sort({ totalTimeUsed: 1 })
        .limit(10)
        .exec((error, data) => {
            if (error) {
                next(error);
            } else {
                res.json(data);
            }
        });
});

// Get best record
router.get("/bestrecord", async (req, res, next) => {
    await RecordModel.findOne()
        .sort({ totalTimeUsed: 1 })
        .exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
});

// Add record
router.post("/leaderboard", async (req, res, next) => {
    try {
        const data = await RecordModel.create(req.body);
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

export default router;
