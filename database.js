const mongoose = require('mongoose');
const { logger } = require('./logger');

require('dotenv').config();
const DB_URI = process.env.DATABASE || '';

function connectDB() {
  mongoose.connect(DB_URI, handleDB)
}

function handleDB() {
  try {
    console.log('Connected to remote loan database');
  } catch (e) {
    logger.log('Unable to connect to remote loan database');
  }
}

module.exports = { connectDB }