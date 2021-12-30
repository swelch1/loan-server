const router = require('express').Router();
const { handleCreateLoan, handleGetLoanDetails, handleUpdateLoan } = require('./controller');

router.post('/create', handleCreateLoan);
router.get('/details/:id', handleGetLoanDetails);
router.put('/update/:id?', handleUpdateLoan);

module.exports = router;