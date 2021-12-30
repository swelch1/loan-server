const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: Number,
  rate: Number,
  lengthMonths: Number,
  monthlyPmt: Number,
});

const Loan = new mongoose.model('loan', loanSchema);

async function createLoan(loan) {
  return await Loan.create(loan);
}

async function getLoanDetailsById(id) {
  return await Loan.findById(id);
}

async function updateLoan(id, loan) {
  return await Loan.findByIdAndUpdate(id, loan, {returnDocument: 'after'});
}

module.exports = {
  createLoan,
  getLoanDetailsById,
  updateLoan
}