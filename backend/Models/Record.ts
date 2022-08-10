import { model, Schema } from "mongoose";

const recordSchema = new Schema(
    {
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
    },
    {
        collection: "records",
    }
);

export default model("Record", recordSchema);
