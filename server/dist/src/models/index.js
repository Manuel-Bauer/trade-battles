const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DBNAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});
module.exports = pool;
