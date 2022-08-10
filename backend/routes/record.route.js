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
const Record_1 = __importDefault(require("../Models/Record"));
const router = (0, express_1.Router)();
// Read record
router.get("/leaderboard", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Record_1.default.find()
        .sort({ totalTimeUsed: 1 })
        .limit(10)
        .exec((error, data) => {
        if (error) {
            next(error);
        }
        else {
            res.json(data);
        }
    });
}));
// Get best record
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
router.post("/leaderboard", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Record_1.default.create(req.body);
        res.json(data);
    }
    catch (error) {
        return next(error);
    }
}));
exports.default = router;
