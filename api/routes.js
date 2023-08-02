const { timeSeries } = require('./controller/timeSeries.controller');

module.exports = function (app) {
  app.get('/timeSeries', timeSeries);
};
