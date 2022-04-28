const router = require('express').Router();
const auth = require('../confing/auth_check');

const loanController = require('../controllers/loan.controller');

router.post('/create', auth, loanController.createLoan);

router.get('/getAll', auth, loanController.getAll);

router.get('/get/:id', auth, loanController.getOne);

router.patch('/update/:id', auth, loanController.updateLoan);

module.exports = router;