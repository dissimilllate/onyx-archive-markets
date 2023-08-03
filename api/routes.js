const {
  timeSeriesHandler,
  timeSeriesMarketsHandler,
  timeSeriesMarketVolumeHandler,
} = require('./controller/timeSeries.controller');

const { validateRequest } = require('./middleware/validator');

module.exports = function (app) {
  app.get('/api', validateRequest, timeSeriesHandler);

  app.get('/api/markets', validateRequest, timeSeriesMarketsHandler);

  app.get('/api/marketVolumeLog', validateRequest, timeSeriesMarketVolumeHandler);
};
