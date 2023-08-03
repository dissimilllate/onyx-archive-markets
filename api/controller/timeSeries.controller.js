const {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
  getTimeSeriesMarketVolumeData,
} = require('../../service/data.service');

async function timeSeriesHandler(req, res) {
  try {
    const { value, startTimestamp, endTimestamp } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    const data = await getTimeSeriesData(value, startDate, endDate);

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Request failed');
  }
}

async function timeSeriesMarketsHandler(req, res) {
  try {
    const { value, startTimestamp, endTimestamp, symbol } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    const data = await getTimeSeriesMarketsData(symbol, value, startDate, endDate);

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Request failed');
  }
}

async function timeSeriesMarketVolumeHandler(req, res) {
  try {
    const { value, startTimestamp, endTimestamp } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    const data = await getTimeSeriesMarketVolumeData(value, startDate, endDate);

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Request failed');
  }
}

module.exports = {
  timeSeriesHandler,
  timeSeriesMarketsHandler,
  timeSeriesMarketVolumeHandler,
};
