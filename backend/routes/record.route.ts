import { Router } from "express";
// import { CallbackError } from "mongoose";
import RecordModel from "../Models/Record";

const router = Router();

// Read record
router.get("/", async (req, res, next) => {
    await RecordModel.find()
        .sort({ totalTimeUsed: 1 })
        .exec((error, data) => {
            if (error) {
                next(error);
            } else {
                res.json(data);
            }
        });
});

// // Read record using find.(callback function)
// router.get("/", (req, res, next) => {
//     RecordModel.find((error, data) => {
//         if (error) {
//             console.log(error)
//             return next(error);
//         } else {
//             res.json(data);
//         }
//         // sort table by total time used asec
//     }).sort({ totalTimeUsed: 1 });
// });

// // Read record using try/catch to read record
// router.get("/", async (req, res, next) => {
//     try {
//         const data = await RecordModel.find().sort({totalTImeUsed: 1})
//         res.json(data)
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// })

// get best record
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
router.post("/", async (req, res, next) => {
    try {
        const data = await RecordModel.create(req.body);
        res.json(data);
    } catch (error) {
        return next(error);
    }
});

// Add record by using callback function
// router.post("/", (req, res, next) => {
    // RecordModel.create(req.body, (error: CallbackError) => {
    //     if (error) {
    //         return next(error)
    //     }
    //     res.json()
    // })
// })

export default router;
