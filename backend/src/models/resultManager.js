const AbstractManager = require("./AbstractManager");

class resultManager extends AbstractManager {
  constructor() {
    super({ table: "baby_guesses" });
  }

  insert(result) {
    return this.database.query(
      `insert into ${this.table} (
        user_id,guessed_name, gender, weight, height
      ) values (?,?,?,?,?)`,
      [
        result.user_id,
        result.guessed_name,
        result.gender,
        result.weight,
        result.height,
      ]
    );
  }

  checkIfUserHasResponded(userId) {
    return this.database
      .query(
        `select count(id) as count 
      from ${this.table} 
      where user_id=?`,
        [userId]
      )
      .then(([result]) => {
        const { count } = result[0];
        return count > 0;
      });
  }

  getAllUserGuesses() {
    return this.database.query(`
        SELECT 
            g.user_id,
            u.first_name,
            u.last_name,
            g.guessed_name,
            g.gender,
            g.weight,
            g.height
        FROM users u
        JOIN baby_guesses g ON u.id = g.user_id
    `);
  }

  updateByUserId(userId, result) {
    return this.database.query(
      `UPDATE ${this.table} SET guessed_name=?, gender=?, weight=?, height=? WHERE user_id=?`,
      [result.guessed_name, result.gender, result.weight, result.height, userId]
    );
  }

  deleteByUserId(userId) {
    return this.database.query(`DELETE FROM ${this.table} WHERE user_id=?`, [
      userId,
    ]);
  }
}

module.exports = resultManager;
