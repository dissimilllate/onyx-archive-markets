const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const {
  PORT,
  HOST,
} = process.env;

app.use(cors());

function initApi() {
  app.listen(PORT, HOST, () => {
    routes(app);
    console.log(`Server started at ${HOST}:${PORT}`);
  });
}

module.exports = { initApi };
