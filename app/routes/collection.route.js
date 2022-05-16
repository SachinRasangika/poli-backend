const collectionController = require('../controllers/collection.controller');
const router = require('express').Router();
const auth = require('../confing/auth_check');

router.post('/create', auth, collectionController.validate("create"), collectionController.create);

router.post('/getrange', auth, collectionController.getbyDateRange);

router.delete('/delete/:id', auth, collectionController.deleteCollection);

router.get('/byloan/:id', collectionController.getByLoanid);

router.get('/get/:id', auth, collectionController.getOne);

router.get('/getAll', auth, collectionController.getAll);

module.exports = router;