"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./database/db");
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const record_route_1 = __importDefault(require("./routes/record.route"));
const app = (0, express_1.default)();
// Connecting mongoDB database
mongoose_1.default.connect(db_1.db).then(() => {
    console.log("Database successfully connected!");
}, (error) => {
    console.log("Could not connect to database : " + error);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
// base route to handle all API requests
app.use("/api", record_route_1.default);
// Have Node serve the files for the built React app
app.use(express_1.default.static(path.resolve(__dirname, "../frontend/build")));
// All other GET request not handled before will return the React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
// PORT
const server = app.listen(db_1.port, () => {
    console.log("Connected to port " + db_1.port);
});
// 404 Error
app.use((req, res, next) => {
    res.status(404).send("Error 404!");
});
// error handler
// https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    res.status(500).send(err.message);
});
