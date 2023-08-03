const {
  getTimeSeriesData,
  getTimeSeriesMarketsData,
} = require('./data.service');


async function checkData(value, startDate, endDate, changeLimit) {
  const data = await getTimeSeriesData(value, startDate, endDate);

  if (data.length) {
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const p = first / 100;
    const diff = last - first;
    const diffPercent = diff / p;

    const firstDate = new Date(data[0].timestamp);
    const lastDate = new Date(data[data.length - 1].timestamp);
    const dateDiff = lastDate - firstDate;
    const dateDiffHours = dateDiff / 1000 / 60 / 60;

    if (Math.abs(diffPercent) >= changeLimit) {
      return {
        success: false,
        message: `${value} changed by ${diffPercent} (${diff}) in ${dateDiffHours} h`,
      };
    }
  }

  return {
    success: true,
  };
}

async function checkMarketsData(symbol, value, startDate, endDate, changeLimit) {
  const data = await getTimeSeriesMarketsData(symbol, value, startDate, endDate);

  if (data.length) {
    const first = data[0].value;
    const last = data[data.length - 1].value;
    const p = first / 100;
    const diff = last - first;
    const diffPercent = diff / p;

    const firstDate = new Date(data[0].timestamp);
    const lastDate = new Date(data[data.length - 1].timestamp);
    const dateDiff = lastDate - firstDate;
    const dateDiffHours = dateDiff / 1000 / 60 / 60;

    if (Math.abs(diffPercent) >= changeLimit) {
      return {
        success: false,
        message: `${symbol}:${value} changed by ${diffPercent} (${diff}) in ${dateDiffHours} h`,
      };
    }
  }

  return {
    success: true,
  };
}

module.exports = {
  checkMarketsData,
  checkData,
};
