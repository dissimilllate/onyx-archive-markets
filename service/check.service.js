const {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
  getTimeSeriesMarketVolumeData,
} = require('./data.service');

const constants = require('../check.constants');

let firstDate = Date.now();

async function check() {
  const failedChecks = [];
  const currentDate = new Date(Date.now());

  for (const value in constants.default) {
    const result = await checkTimeSeriesData(value, firstDate, currentDate);

    if (!result.success) {
      failedChecks.push({
        value,
        startTimestamp: result.startTimestamp,
        endTimestamp: result.endTimestamp,
        diff: result.diff,
        diffPercent: result.diffPercent,
      });
    }
  }

  for (const symbol in constants.markets) {
    for (const value in constants.markets[symbol]) {
      const result = await checkTimeSeriesMarketsData(value, firstDate, currentDate, symbol);

      if (!result.success) {
        failedChecks.push({
          value,
          symbol,
          startTimestamp: result.startTimestamp,
          endTimestamp: result.endTimestamp,
          diff: result.diff,
          diffPercent: result.diffPercent,
        });
      }
    }
  }

  for (const value in constants.marketVolumeLog) {
    const result = await checkTimeSeriesMarketVolumeData(value, firstDate, currentDate);

    if (!result.success) {
      failedChecks.push({
        value,
        startTimestamp: result.startTimestamp,
        endTimestamp: result.endTimestamp,
        diff: result.diff,
        diffPercent: result.diffPercent,
      });
    }
  }

  firstDate = currentDate;

  return failedChecks;
}

async function checkTimeSeriesData(value, startDate, endDate) {
  const data = await getTimeSeriesData(value, startDate, endDate, true);

  return checkData(data, constants[value]);
}

async function checkTimeSeriesMarketsData(value, startDate, endDate, symbol){
  const data = await getTimeSeriesMarketsData(value, startDate, endDate, true, symbol);

  return checkData(data, constants.markets[symbol][value]);
}

async function checkTimeSeriesMarketVolumeData(value, startDate, endDate) {
  const data = await getTimeSeriesMarketVolumeData(value, startDate, endDate, true);

  return checkData(data, constants.marketVolumeLog[value]);
}

function checkData(data, changeLimit) {
  if (data.length) {
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const p = first / 100;
    const diff = last - first;
    const diffPercent = diff / p;

    if (Math.abs(diffPercent) >= changeLimit) {
      return {
        success: false,
        diff,
        diffPercent,
        startTimestamp: data[0].timestamp,
        endTimestamp: data[data.length - 1].timestamp,
      };
    }
  }

  return {
    success: true,
  };
}
module.exports = {
  check,
};
