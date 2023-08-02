require('dotenv').config();
const axios = require('axios');
const { CronJob } = require('cron');
const db = require('./database/Mongo.database');
const {
  ONYX_MARKETS_URL,
  MONGODB_COLLECTION_NAME,
  CRON_ARCHIVE_INTERVAL,
} = process.env;

async function main() {
  try {
    await db.init();

    const job = new CronJob(CRON_ARCHIVE_INTERVAL, async () => {
      const data = await axios.get(ONYX_MARKETS_URL);
      await db.insertOne(MONGODB_COLLECTION_NAME, {
        timestamp: new Date(),
        metadata: {
          sourceUrl: ONYX_MARKETS_URL,
        },
        data: data.data,
      });
    });

    job.start();
    console.log('Started archive markets job');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
