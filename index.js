require('dotenv').config();
const axios = require('axios');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);


async function main() {
  await client.connect();

  const db = client.db(process.env.MONGODB_DATABASE);

  if (!(await db.listCollections({name: process.env.MONGODB_COLLECTION_NAME}).toArray()).length) {
    await db.createCollection(
      process.env.MONGODB_COLLECTION_NAME,
      {
        timeseries: {
          timeField: 'timestamp',
          metaField: 'metadata',
          granularity: 'hours',
        },
      },
    );
  }

  setInterval(async () => {
    const data = await axios.get(process.env.ONYX_MARKETS_URL);
    await db.collection(process.env.MONGODB_COLLECTION_NAME).insertOne({
      timestamp: new Date(),
      metadata: {
        sourceUrl: process.env.ONYX_MARKETS_URL,
      },
      data: data.data,
    });
  }, process.env.FREQ);
}

main();
