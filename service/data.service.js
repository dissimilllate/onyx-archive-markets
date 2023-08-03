const { find } = require('../database/Mongo.database');

const {
  MONGODB_COLLECTION_NAME,
} = process.env;

async function getTimeSeriesData(value, startDate, endDate) {
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
    return {
      value: document.data.data[value],
      timestamp: document.timestamp,
    };
  });
}

async function getTimeSeriesMarketsData(value, startDate, endDate, symbol) {
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

async function getTimeSeriesMarketVolumeData(value, startDate, endDate) {
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
    return {
      value: document.data.data.marketVolumeLog[value],
      timestamp: document.timestamp,
    };
  });
}

module.exports = {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
  getTimeSeriesMarketVolumeData,
};