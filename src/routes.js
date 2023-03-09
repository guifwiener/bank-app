const { Router } = require('express');
const AccountController = require('./app/controllers/AccountController');
const AccountLevelController = require('./app/controllers/AccountLevelController');
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
router.get('/clients/:id', ClientController.show);
router.post('/clients', ClientController.store);
router.put('/clients/:id', ClientController.update);
router.delete('/clients/:id', ClientController.delete);

// Account Levels routes
router.get('/levels', AccountLevelController.index);
router.get('/levels/:id', AccountLevelController.show);
router.post('/levels', AccountLevelController.store);
router.put('/levels/:id', AccountLevelController.update);
router.delete('/levels/:id', AccountLevelController.delete);

module.exports = router;
