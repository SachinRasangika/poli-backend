const router = require('express').Router();
const auth = require('../confing/auth_check');

const clientController = require('../controllers/client.controller');

router.post('/create', auth, clientController.validate("create"), clientController.createClient);

router.get('/getAll', auth, clientController.getAllClients);

router.get('/get/:id', auth, clientController.getSingleClient);

router.patch('/update/:id', auth, clientController.validate("create"), clientController.updateClient);

module.exports = router;