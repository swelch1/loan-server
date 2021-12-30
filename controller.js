const { logger } = require('./logger');
const Model = require('./model');

async function handleCreateLoan(req, res) {
  try {
    const loan = req.body;
    if (!checkLoanInput(loan)) res.status(400).send({message: 'Please fill in all fields with the correct input type.'})
    else {
      const newLoan = await Model.createLoan(loan);
      res.status(201).send(newLoan);
    }
  } catch (e) {
    logger.log('error', '[controller.js] Error creating loan');
    res.status(500).send({message: 'Error creating loan'});
  }
}

async function handleGetLoanDetails(req, res) {
  const id = req.params.id;
  try {
    const loan = await Model.getLoanDetailsById(id);
    res.status(200).send(loan);
  } catch (e) {
    logger.log('error', '[controller.js] Error fetching loan');
    res.status(500).send({message: `Error fetching loan ${id}`});
  }
}

async function handleUpdateLoan(req, res) {
  try {
    if (!id) res.status(400).send({message: 'Please provide a loan ID.'})
    const id = req.params.id;
    const updates = cleanReqBody(req.body);
    if (updates.error) res.status(400).send({message: 'Please make sure all fields are in the correct format.'})
    const loan = await Model.updateLoan(id, updates);
    res.status(200).send(loan);
  } catch (e) {
    logger.log('error',`[controller.js] Error updating loan, user passed in ID: ${req.params.id}`);
    res.status(500).send({message: '500. Error updating loan. Please check ID passed in.'});
  }
}

function checkLoanInput(loan) {
  if (!loan.amount || !loan.rate || !loan.lengthMonths || !loan.monthlyPmt) return false;
  for (let prop in loan) {
    if (typeof parseInt(loan[prop]) !== 'number') return false;
  }
  return true;
}

function cleanReqBody(body) {
  const fields = ['amount', 'rate', 'lengthMonths', 'monthlyPmt'];
  const updates = {};
  for (let prop in body) {
    if (fields.includes(prop) && body[prop] !== '') {
      if (typeof parseInt(body[prop]) !== 'number') updates.error = prop 
      else updates[prop] = body[prop];
    }
  }
  return updates;
}

module.exports = { 
  handleCreateLoan, 
  handleGetLoanDetails, 
  handleUpdateLoan 
}