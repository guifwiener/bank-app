const ClientsRepository = require('../repositories/ClientsRepository');

class ClientController {
  async index(request, response) {
    const { orderBy } = request.params;
    const clients = await ClientsRepository.findAll(orderBy);
    return response.json(clients);
  }

  async show(request, response) {
    const { id } = request.params;
    const client = await ClientsRepository.findById(id);

    if (!client) {
      return response.status(404).json({ error: 'Client not found' });
    }
    return response.json(client);
  }

  async store(request, response) {
    const { first_name, last_name } = request.body;
    if (!first_name || !last_name) {
      return response.status(400).json({ error: 'First name or last name not found' });
    }

    const clientExists = await ClientsRepository.findByName(first_name, last_name);
    if (clientExists) {
      return response.status(400).json({ error: 'Client already has a registered account' });
    }

    const client = await ClientsRepository.create({ first_name, last_name });
    return response.json(client);
  }
}

module.exports = new ClientController();
