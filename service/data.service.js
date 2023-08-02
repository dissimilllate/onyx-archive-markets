const { find } = require('../database/Mongo.database');

const {
  MONGODB_COLLECTION_NAME,
} = process.env;

async function getTimeSeriesData(symbol, value, startDate, endDate) {
  let query = {};

  if (startDate || endDate) {
    query = {
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    };
  }

  const documents = await find(
    MONGODB_COLLECTION_NAME,
    query,
    {
      timestamp: 1,
    }
  );

  return documents.map((document) => {
    const market = document.data.data.markets.find((market) => market.symbol.toLowerCase() === symbol.toLowerCase());
    return {
      value: market[value],
      timestamp: document.timestamp,
    };
  });
}

module.exports = { getTimeSeriesData };