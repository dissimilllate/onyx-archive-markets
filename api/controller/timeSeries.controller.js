const {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
  getTimeSeriesMarketVolumeData,
  getTimeSeriesPercent,
} = require('../../service/data.service');

async function timeSeriesHandler(req, res) {
  try {
    const { value, valueType, startTimestamp, endTimestamp } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    let data = await getTimeSeriesData(value, startDate, endDate);

    if (valueType === 'percent') {
      data = getTimeSeriesPercent(data);
    }

    return res.json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Request failed');
  }
}

async function timeSeriesMarketsHandler(req, res) {
  try {
    const { value, valueType, startTimestamp, endTimestamp, symbol } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    let data = await getTimeSeriesMarketsData(value, startDate, endDate, symbol);

    if (valueType === 'percent') {
      data = getTimeSeriesPercent(data);
    }

    return res.json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Request failed');
  }
}

async function timeSeriesMarketVolumeHandler(req, res) {
  try {
    const { value, valueType, startTimestamp, endTimestamp } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    let data = await getTimeSeriesMarketVolumeData(value, startDate, endDate);

    if (valueType === 'percent') {
      data = getTimeSeriesPercent(data);
    }

    return res.json({
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Request failed');
  }
}

module.exports = {
  timeSeriesHandler,
  timeSeriesMarketsHandler,
  timeSeriesMarketVolumeHandler,
};
