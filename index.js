require('dotenv').config();
const axios = require('axios');
const { CronJob } = require('cron');
const { initDatabase } = require('./database/Mongo.database');

async function main() {
  try {
    const db = await initDatabase();

    const job = new CronJob(process.env.CRON_ARCHIVE_INTERVAL, async () => {
      const data = await axios.get(process.env.ONYX_MARKETS_URL);
      await db.collection(process.env.MONGODB_COLLECTION_NAME).insertOne({
        timestamp: new Date(),
        metadata: {
          sourceUrl: process.env.ONYX_MARKETS_URL,
        },
        data: data.data,
      });
    });

    job.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
