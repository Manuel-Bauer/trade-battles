"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDB = void 0;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();
function cleanDB() {
    return exec(`DATABASE_URL=${process.env.DATABASE_URL} npx prisma migrate reset --skip-generate --skip-seed -f`);
}
exports.cleanDB = cleanDB;
