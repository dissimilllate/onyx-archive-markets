require('dotenv').config();
const axios = require('axios');
const { CronJob } = require('cron');
const db = require('./database/Mongo.database');
const { initApi } = require('./api');
const { check } = require('./service/check.service');
const { notify } = require('./service/notifications/discord.notifications');

const {
  ONYX_MARKETS_URL,
  CRON_ARCHIVE_INTERVAL,
  CRON_CHECK_INTERVAL,
} = process.env;

async function main() {
  try {
    await db.init();

    const archiveJob = new CronJob(CRON_ARCHIVE_INTERVAL, async () => {
      try {
        const data = await axios.get(ONYX_MARKETS_URL);
        await db.insertOne({
          timestamp: new Date(),
          metadata: {
            sourceUrl: ONYX_MARKETS_URL,
          },
          data: data.data,
        });
      } catch (error) {
        console.error(error);
        notify('Archive job resulted in error' + error, 'warn');
      }
    });

    const checkJob = new CronJob(CRON_CHECK_INTERVAL, async () => {
      try {
        const failedChecks = await check();
        if (!failedChecks.length) {
          console.log('Check successful');
        } else {
          for (const failedCheck of failedChecks) {
            const diffHours = (failedCheck.endTimestamp - failedCheck.startTimestamp) / 1000 / 60 / 60;
            const message = `${failedCheck.value}${failedCheck.symbol ? ':' + failedCheck.symbol : ''} has changed by ${failedCheck.diffPercent}% (${failedCheck.diff}) in ${diffHours} hours`;

            notify(message, 'warn');
            console.error(message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    archiveJob.start();
    console.log('Started archive markets job');

    checkJob.start();
    console.log('Started check job');

    initApi();

    notify('Onyx archive markets service started', 'info');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
