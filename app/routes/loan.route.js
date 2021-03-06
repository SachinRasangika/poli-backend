const router = require('express').Router();
const auth = require('../confing/auth_check');

const loanController = require('../controllers/loan.controller');

router.post('/create', auth, loanController.createLoan);

router.post('/getInfo', loanController.loanDetailsForCustomer);

router.get('/getAll', auth, loanController.getAll);

router.get('/get/:id', auth, loanController.getOne);

router.get('/get/byclient/:id', loanController.findLoansByClientId);

router.patch('/update/:id', auth, loanController.updateLoan);

module.exports = router;