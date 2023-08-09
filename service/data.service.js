const { find, aggregate } = require('../database/Mongo.database');

const {
  MONGODB_COLLECTION_NAME,
} = process.env;

async function getTimeSeriesData(value, startDate, endDate, isFirstAndLast) {
  let documents;
  if (isFirstAndLast) {
    documents = await getFirstAndLastData(startDate, endDate);
  } else {
    documents = await getData(startDate, endDate);
  }

  return documents.map((document) => {
    return {
      value: +document.data.data[value],
      timestamp: document.timestamp,
    };
  });
}

async function getTimeSeriesMarketsData(value, startDate, endDate, isFirstAndLast, symbol) {
  let documents;
  if (isFirstAndLast) {
    documents = await getFirstAndLastData(startDate, endDate);
  } else {
    documents = await getData(startDate, endDate);
  }

  return documents.map((document) => {
    const market = document.data.data.markets.find((market) => market.symbol.toLowerCase() === symbol.toLowerCase());
    return {
      value: +market[value],
      timestamp: document.timestamp,
    };
  });
}

async function getTimeSeriesMarketVolumeData(value, startDate, endDate, isFirstAndLast) {
  let documents;
  if (isFirstAndLast) {
    documents = await getFirstAndLastData(startDate, endDate);
  } else {
    documents = await getData(startDate, endDate);
  }

  return documents.map((document) => {
    return {
      value: +document.data.data.marketVolumeLog[value],
      timestamp: document.timestamp,
    };
  });
}

function getData(startDate, endDate) {
  let query = {};

  if (startDate || endDate) {
    query = {
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    };
  }

  return find(
    query,
    {
      timestamp: 1,
    }
  );
}

async function getFirstAndLastData(startDate, endDate) {
  const pipeline = [];

  if (startDate) {
    pipeline.push({
      $match: {
        timestamp: {
          $gte: startDate,
        },
      },
    });
  }

  if (endDate) {
    pipeline.push({
      $match: {
        timestamp: {
          $lte: endDate,
        },
      },
    });
  }

  pipeline.push({
    $group: {
      _id: null,
      first: { $first: '$$ROOT' },
      last: { $last: '$$ROOT' },
    }
  });

  const result = await aggregate(pipeline);

  return [result[0]?.first, result[0]?.last].filter((x) => !!x);
}

function getTimeSeriesPercent(data) {
  if (data.length) {
    const p = data[0].value / 100;

    return data.map((x) => {
      return {
        value: x.value / p - 100,
        timestamp: x.timestamp,
      };
    });
  } else {
    return [];
  }
}

module.exports = {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
  getTimeSeriesMarketVolumeData,
  getTimeSeriesPercent,
};