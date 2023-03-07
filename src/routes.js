const { Router } = require('express');
const AccountController = require('./app/controllers/AccountController');
const ClientController = require('./app/controllers/ClientController');

const router = Router();

// Accounts routes
router.get('/accounts', AccountController.index);
router.get('/accounts/:id', AccountController.show);
router.post('/accounts', AccountController.store);
router.put('/accounts/:id', AccountController.update);
router.delete('/accounts/:id', AccountController.delete);

// Clients routes
router.get('/clients', ClientController.index);

module.exports = router;
