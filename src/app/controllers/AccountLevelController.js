const AccountLevelsRepository = require('../repositories/AccountLevelsRepository');

class AccountLevelController {
  async index(request, response) {
    const { orderBy } = request.params;
    const levels = await AccountLevelsRepository.findAll(orderBy);
    return response.json(levels);
  }

  async show(request, response) {
    const { id } = request.params;
    const level = await AccountLevelsRepository.findById(id);

    if (!level) {
      return response.status(404).json({ error: 'Account level not found' });
    }

    return response.json(level);
  }

  async store(request, response) {
    const {
      name, max_balance, benefits, price_per_month,
    } = request.body;
    if (!name || !max_balance || !price_per_month) {
      return response.status(400).json({ error: 'Missing argument in request' });
    }

    const levelExists = await AccountLevelsRepository.findByName(name);
    if (levelExists) {
      return response.status(400).json({ error: 'Name is already registered in another account level' });
    }

    const level = await AccountLevelsRepository.create({
      name, max_balance, benefits, price_per_month,
    });
    return response.json(level);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, max_balance, benefits, price_per_month,
    } = request.body;

    const levelExists = await AccountLevelsRepository.findById(id);
    if (!levelExists) {
      return response.status(404).json({ error: 'Account level not found' });
    }
    if (!name || !max_balance || !price_per_month) {
      return response.status(400).json({ error: 'Missing argument in request' });
    }

    const level = await AccountLevelsRepository.update(id, {
      name, max_balance, benefits, price_per_month,
    });
    return response.json(level);
  }

  async delete(request, response) {
    const { id } = request.params;
    await AccountLevelsRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new AccountLevelController();
