const { Pool } = require("pg");

const pool = new Pool({
	user: "sebastianfernandez",
	host: "localhost",
	database: "TradeBattlesBackend",
	password: "",
	port: 5432,
});

module.exports = pool;
