const axios = require('axios');
const { MongoClient } = require('mongodb');

const XCN_URL = 'https://api.onyx.org/api/xcn';
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'onyxmarkets';

const client = new MongoClient(DB_URL);

let db;

async function main() {
  await client.connect();

  db = client.db(DB_NAME);

  if (!(await db.listCollections({name: 'markets'}).toArray()).length) {
    await db.createCollection(
      'markets',
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
    const data = await axios.get(XCN_URL);
    await db.collection('markets').insertOne({
      timestamp: new Date(),
      metadata: {
        sourceUrl: XCN_URL,
      },
      data: data.data,
    });
  }, 10000);
}

main();
