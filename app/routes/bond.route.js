const router = require('express').Router();
const auth = require('../confing/auth_check');

const bondController = require('../controllers/bond.controller');

router.post('/create', auth, bondController.validate("create"), bondController.create);

router.get('/getAll', auth, bondController.getAll);

router.get('/get/:id', auth, bondController.getSingle);

router.patch('/update/:id', auth, bondController.update);

module.exports = router;