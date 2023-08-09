const {
  timeSeriesHandler,
  timeSeriesMarketsHandler,
  timeSeriesMarketVolumeHandler,
} = require('./controller/timeSeries.controller');

const { validateRequest } = require('./middleware/validator');

module.exports = function (app) {
  app.get('/api/timeseries', validateRequest, timeSeriesHandler);

  app.get('/api/timeseries/markets', validateRequest, timeSeriesMarketsHandler);

  app.get('/api/timeseries/marketVolumeLog', validateRequest, timeSeriesMarketVolumeHandler);
};
