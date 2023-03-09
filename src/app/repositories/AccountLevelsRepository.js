const db = require('../../database');

class AccountLevelsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM account_levels
      ORDER BY name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM account_levels
      WHERE id = $1
    `, [id]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`
      SELECT *
      FROM account_levels
      WHERE name = $1
    `, [name]);
    return row;
  }

  async create({
    name, max_balance, benefits, price_per_month,
  }) {
    const [row] = await db.query(`
      INSERT INTO account_levels (
        name, max_balance, benefits, price_per_month
      ) VALUES (
        $1, $2, $3, $4
      ) RETURNING *
    `, [name, max_balance, benefits, price_per_month]);
    return row;
  }

  async update(id, {
    name, max_balance, benefits, price_per_month,
  }) {
    const [row] = await db.query(`
      UPDATE account_levels
      SET name = $1
        , max_balance = $2
        , benefits = $3
        , price_per_month = $4
      WHERE id = $5
      RETURNING *
    `, [name, max_balance, benefits, price_per_month, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM account_levels
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new AccountLevelsRepository();
