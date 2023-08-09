// Every number corresponds to limit (in percents) for value to trigger exception at check

module.exports = {
  default: {
    xcnRate: 10,
    dailyXcn: 10,
  },
  markets: {
    ousdc: {
      totalBorrows2: 10,
      totalSupply2: 10,
    }
  },
  marketVolumeLog: {
    totalSupplyUsd: 10,
    totalSupplyUsd24h: 10,
  },
};