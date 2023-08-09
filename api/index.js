const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const {
  API_PORT,
  API_HOST,
} = process.env;

app.use(cors());

function initApi() {
  app.listen(API_PORT, API_HOST, () => {
    routes(app);
    console.log(`Server started at ${API_HOST}:${API_PORT}`);
  });
}

module.exports = { initApi };
