const {
  timeSeriesHandler,
  timeSeriesMarketsHandler,
  timeSeriesMarketVolumeHandler,
} = require('./controller/timeSeries.controller');

const { validateRequest } = require('./middleware/validator');

module.exports = function (app) {
  app.get('/', validateRequest, timeSeriesHandler);

  app.get('/markets', validateRequest, timeSeriesMarketsHandler);

  app.get('/marketVolumeLog', validateRequest, timeSeriesMarketVolumeHandler);
};
