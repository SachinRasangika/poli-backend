const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/getall', userController.GetAllUsers);

module.exports = router;