"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.db = exports.localdb = void 0;
require("dotenv/config");
exports.localdb = "mongodb://localhost:27017/reactdb";
exports.db = process.env.MONGODB_URL || '';
exports.port = process.env.PORT || 4000;
