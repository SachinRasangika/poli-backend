const userController = require('../controllers/user.controller');
const router = require('express').Router();
const auth = require('../confing/auth_check');

router.post('/create', userController.validate("createUser"), userController.createUser);

router.post('/login', userController.validate("login"), userController.login);

router.get('/getall', auth, userController.GetAllUsers);

router.get('/get/collectors', auth, userController.getCollectors);

router.patch('/password/reset', auth, userController.resetPassword);

module.exports = router;