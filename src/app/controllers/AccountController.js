const AccountsRepository = require('../repositories/AccountsRepository');

class AccountController {
  async index(request, response) {
    const { orderBy } = request.params;
    const accounts = await AccountsRepository.findAll(orderBy);
    return response.json(accounts);
  }

  async show(request, response) {
    const { id } = request.params;
    const account = await AccountsRepository.findById(id);

    if (!account) {
      return response.status(404).json({ error: 'Account not found' });
    }

    return response.json(account);
  }

  async store(request, response) {
    const {
      password, owner_id, balance, account_level_id,
    } = request.body;

    const clientHasccount = await AccountsRepository.findByOwner(owner_id);

    if (clientHasccount) {
      return response.status(400).json({ error: 'Owner already has a registered account' });
    }

    const account = await AccountsRepository.create({
      password, owner_id, balance, account_level_id,
    });
    return response.json(account);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      password, owner_id, balance, account_level_id,
    } = request.body;

    if (!password) {
      return response.status(400).json({ error: 'You must enter the account password' });
    }

    const accountExists = await AccountsRepository.findById(id);

    if (!accountExists) {
      return response.status(404).json({ error: 'Account not found' });
    }

    if (password !== accountExists.password) {
      return response.status(400).json({ error: 'Incorrect password' });
    }

    const account = await AccountsRepository.update(id, {
      password, owner_id, balance, account_level_id,
    });
    return response.json(account);
  }

  async delete(request, response) {
    const { id } = request.params;

    await AccountsRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new AccountController();
