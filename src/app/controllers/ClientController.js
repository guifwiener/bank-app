const ClientsRepository = require('../repositories/ClientsRepository');

class ClientController {
  async index(request, response) {
    const clients = await ClientsRepository.findAll();
    return response.json(clients);
  }

  async store(request, response) {
    const { first_name, last_name } = request.body;
    const client = await ClientsRepository.create({ first_name, last_name });
    return response.json(client);
  }
}

module.exports = new ClientController();
