require('dotenv').config();
const { MongoClient } = require('mongodb');

async function initDatabase() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);

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

    console.log('Connected to MongoDB');

    return db;
  } catch (error) {
    console.error("DB initialization error", error);
    process.exit(1);
  }
}

module.exports = { initDatabase };
