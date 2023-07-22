const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findByDetails(firstname, lastname, phonenumber) {
    return this.database.query(
      `SELECT * FROM ${this.table} 
      WHERE first_name = ?
       AND last_name = ? 
       AND phone_number = ?`,
      [firstname, lastname, phonenumber]
    );
  }
}

module.exports = userManager;
