const { v4 } = require('uuid');
const db = require('../../database');

let accounts = [
  {
    id: v4(),
    password: '123abc',
    owner_id: v4(),
    balance: 100,
    account_level_id: v4(),
  },
];

class AccountsRepository {
  async findAll(orderBy = 'ASC') {
    return new Promise((resolve) => {
      resolve(accounts);
    });
    // const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // const rows = await db.query(`SELECT * FROM accounts ORDER BY id ${direction}`);
    // return rows;
  }

  async findById(id) {
    return new Promise((resolve) => {
      resolve(accounts.find((account) => account.id === id));
    });
  }

  async findByOwner(owner_id) {
    return new Promise((resolve) => {
      resolve(accounts.find((account) => account.owner_id === owner_id));
    });
  }

  async findByLevel(account_level_id) {
    return new Promise((resolve) => {
      resolve(accounts.find((account) => account.account_level_id === account_level_id));
    });
  }

  async create({
    password, owner_id, balance, account_level_id,
  }) {
    // return new Promise((resolve) => {
    //   const row = {
    //     id: v4(),
    //     password,
    //     owner_id,
    //     balance,
    //     account_level_id,
    //   };
    //   accounts.push(row);
    //   resolve(row);
    // });
    const row = await db.query(`
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
    return new Promise((resolve) => {
      let row = accounts.find((account) => account.id === id);
      row = {
        id, password, owner_id, balance, account_level_id,
      };
      resolve(row);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      accounts = accounts.filter((account) => account.id !== id);
      resolve();
    });
  }
}

module.exports = new AccountsRepository();
