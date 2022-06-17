const pool = require("./index");
const table_name = "battles";
const { v4 } = require("uuid");
const user_model = require("./users.model");
const transaction_model = require("./transactions.model");

exports.getMyBattles = async (user_id) => {
	console.log("getMyBattles", user_id);
	const allBattles = await pool.query(`SELECT * FROM ${table_name}`);
	const myBattles = allBattles.rows.filter((battle) =>
		battle.battle_members.includes(user_id)
	);
	console.log(myBattles);

	if (myBattles.length === 0) throw new Error("No battles found for this user");

	// Replace userid's with user objects
	for (let battleIdx = 0; battleIdx < myBattles.length; battleIdx++) {
		const battleMembers = [];
		for (let member of myBattles[battleIdx].battle_members) {
			const member_obj = await user_model.getUser(member);
			battleMembers.push(...member_obj);
		}
		myBattles[battleIdx].battle_members = battleMembers;
	}

	// Add transaction array to user objects
	for (let battleIdx = 0; battleIdx < myBattles.length; battleIdx++) {
		for (let member of myBattles[battleIdx].battle_members) {
			const transactions_obj =
				await transaction_model.filterTransactionsByUserIdBattleId(
					member.user_id,
					myBattles[battleIdx].battle_id
				);
			member.transactions.push(...transactions_obj.rows);
		}
	}
	return Promise.all(myBattles);
};

exports.createBattle = (battle) => {
	// const sql = `INSERT INTO ${table_name} (battle_id, battle_members, start_date_timestamp, end_date_timestamp, battle_name) VALUES ($1,$2,$3,$4,$5)`;
	const sql = "CALL create_battle($1,$2,$3,$4,$5)";
	const id = v4();
	const values = [
		id,
		battle.battle_members,
		battle.start_date,
		battle.end_date,
		battle.battle_name,
	];
	const result = pool.query(sql, values);

	for (let member of battle.battle_members) {
		user_model.addBattleToUser(member, id);
	}
	return result;
};

exports.updateBattleMembers = async (battle_id, new_members) => {
	console.log("inside update battle members");
	const sql = await pool.query(
		`UPDATE ${table_name} SET battle_members = array_append(battle_members, '${new_members.user_id}') WHERE battle_id  = '${battle_id}'`
	);
	user_model.addBattleToUser(new_members.user_id, battle_id);
	return sql;
};
