const db = require('../../database');

class AccountsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT acc.id
          , acc.owner_id
          , cli.first_name
          , cli.last_name
          , acc.balance
          , acc.account_level_id
          , lvl.name
          , lvl.max_balance
          , lvl.benefits
          , lvl.price_per_month
    FROM accounts acc
      JOIN clients cli
      ON acc.owner_id = cli.id
      JOIN account_levels lvl
      ON acc.account_level_id = lvl.id
    ORDER BY id ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT acc.id
        , acc.owner_id
        , cli.first_name
        , cli.last_name
        , acc.balance
        , acc.account_level_id
        , lvl.name
        , lvl.max_balance
        , lvl.benefits
        , lvl.price_per_month
      FROM accounts acc
      JOIN clients cli
      ON acc.owner_id = cli.id
      JOIN account_levels lvl
      ON acc.account_level_id = lvl.id
      WHERE acc.id = $1
    `, [id]);
    return row;
  }

  async findByOwner(owner_id) {
    const [row] = await db.query(`
      SELECT *
      FROM accounts
      WHERE owner_id = $1
    `, [owner_id]);
    return row;
  }

  async findByLevel(account_level_id) {
    const [row] = await db.query(`
      SELECT *
      FROM accounts
      WHERE account_level_id = $1
    `, [account_level_id]);
    return row;
  }

  async create({
    password, owner_id, balance, account_level_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO accounts (
        password, owner_id, balance, account_level_id
      ) VALUES (
        $1, $2, $3, $4
      ) RETURNING *
    `, [password, owner_id, balance, account_level_id]);
    return row;
  }

  async update(id, {
    password, owner_id, balance, account_level_id,
  }) {
    const [row] = await db.query(`
      UPDATE accounts
      SET password = $1
          , owner_id = $2
          , balance = $3
          , account_level_id = $4
      WHERE id = $5
      RETURNING *
    `, [password, owner_id, balance, account_level_id, id]);
    return row;
  }

  async delete(id) {
    const [deleteOp] = await db.query(`
      DELETE from accounts
      WHERE id = $1
    `, [id]);
    return deleteOp;
    // });
  }
}

module.exports = new AccountsRepository();
