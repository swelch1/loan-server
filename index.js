const express = require('express');
const cors = require('cors');
const router = require('./router');
const { connectDB } = require('./database');
const { logger } = require('./logger');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = new express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, handleServer)

function handleServer() {
  try {
    connectDB();
    console.log(`Listening on port: ${PORT}`);
  } catch (e) {
    logger.log(`Error launching server on port: ${PORT}`);
  }
}
