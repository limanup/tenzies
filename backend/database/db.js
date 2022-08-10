"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.db = exports.localdb = void 0;
require("dotenv/config");
exports.localdb = "mongodb://localhost:27017/reactdb";
// export const db = process.env.MONGODB_URL || ''
exports.db = "mongodb+srv://admin:wQhrZ8g7vAg69PY2@tenzies.hvv6iwn.mongodb.net/leaderboard?appName=mongosh+1.5.4";
exports.port = process.env.PORT || 4000;
