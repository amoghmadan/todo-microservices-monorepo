const path = require("path");

const BASE_DIR = path.dirname(__dirname);
const DEBUG = process.env.DEBUG === "true";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo";
const PAGE_SIZE = 10;

module.exports = { BASE_DIR, DEBUG, MONGODB_URI, PAGE_SIZE };
