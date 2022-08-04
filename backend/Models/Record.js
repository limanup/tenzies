const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// import mongoose, { Schema, InferSchemaType } from 'mongoose';

const recordSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rollCount: {
            type: Number,
            required: true,
        },
        totalTimeUsed: {
            type: Number,
            required: true,
        },
    },
    {
        collection: "records",
    }
);

module.exports = mongoose.model("Record", recordSchema);
// const RecordModel = mongoose.model('Record', recordSchema)
// export {recordSchema, RecordModel}
