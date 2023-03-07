const db = require('../../database');

class ClientsRepository {
  async create({ first_name, last_name }) {
    const row = db.query(`
      INSERT INTO clients (
        first_name, last_name
      ) VALUES (
        $1, $2
      ) RETURNING *
    `, [first_name, last_name]);
    return row;
  }
}

module.exports = new ClientsRepository();
