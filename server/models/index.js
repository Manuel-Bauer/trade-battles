const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: 'TradeBattlesBackend',
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = pool;
