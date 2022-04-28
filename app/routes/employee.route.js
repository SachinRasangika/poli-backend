const router = require('express').Router();
const auth = require('../confing/auth_check');

const employeeController = require('../controllers/employee.controller');

router.post('/create', auth, employeeController.create);

router.get('/getAll', auth, employeeController.getAll);

router.get('/get/:id', auth, employeeController.getOne);

router.patch('/update/:id', auth, employeeController.update);

router.delete('/delete/:id', auth, employeeController.delete);

module.exports = router;