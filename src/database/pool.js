"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
var dotenv = require("dotenv");
dotenv.config();
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
