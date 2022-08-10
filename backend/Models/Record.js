"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recordSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    rollCount: {
        type: Number,
        required: true,
    },
    totalTimeUsed: {
        type: Number,
        required: true,
    },
}, {
    collection: "records",
});
exports.default = (0, mongoose_1.model)("Record", recordSchema);
