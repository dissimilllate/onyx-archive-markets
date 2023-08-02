const {getTimeSeriesData} = require('../../service/data.service');

async function timeSeries(req, res) {
  try {
    const { symbol, value, startTimestamp, endTimestamp } = req.query;

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    if (startTimestamp && startDate.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid startTimestamp parameter');
    }

    if (endTimestamp && endDate.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid endTimestamp parameter');
    }

    const data = await getTimeSeriesData(symbol, value, startDate, endDate);

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Request failed');
  }
}

module.exports = {
  timeSeries,
};
