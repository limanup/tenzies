"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { CallbackError } from "mongoose";
const Record_1 = __importDefault(require("../Models/Record"));
const router = (0, express_1.Router)();
// Read record
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Record_1.default.find()
        .sort({ totalTimeUsed: 1 })
        .exec((error, data) => {
        if (error) {
            next(error);
        }
        else {
            res.json(data);
        }
    });
}));
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
router.get("/bestrecord", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Record_1.default.findOne()
        .sort({ totalTimeUsed: 1 })
        .exec((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
}));
// Add record
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Record_1.default.create(req.body);
        res.json(data);
    }
    catch (error) {
        return next(error);
    }
}));
// Add record by using callback function
// router.post("/", (req, res, next) => {
// RecordModel.create(req.body, (error: CallbackError) => {
//     if (error) {
//         return next(error)
//     }
//     res.json()
// })
// })
exports.default = router;
