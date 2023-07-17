require('dotenv').config();
const axios = require('axios');
const { CronJob } = require('cron');
const db = require('./database/Mongo.database');

async function main() {
  try {
    await db.init();

    const job = new CronJob(process.env.CRON_ARCHIVE_INTERVAL, async () => {
      const data = await axios.get(process.env.ONYX_MARKETS_URL);
      await db.insertOne(process.env.MONGODB_COLLECTION_NAME, {
        timestamp: new Date(),
        metadata: {
          sourceUrl: process.env.ONYX_MARKETS_URL,
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
