const db = require('../../database');

class ClientsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM clients
      ORDER BY first_name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM clients
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByName(first_name, last_name) {
    const [row] = await db.query(`
      SELECT *
      FROM clients
      WHERE first_name = $1
      AND last_name = $2
    `, [first_name, last_name]);
    return row;
  }

  async create({ first_name, last_name }) {
    const [row] = await db.query(`
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
