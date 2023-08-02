const { MongoClient } = require('mongodb');

let db;

const {
  MONGODB_URI,
  MONGODB_DATABASE,
  MONGODB_COLLECTION_NAME,
} = process.env;

async function init() {
  try {
    const client = new MongoClient(MONGODB_URI);

    await client.connect();

    db = client.db(MONGODB_DATABASE);

    if (!(await db.listCollections({name: MONGODB_COLLECTION_NAME}).toArray()).length) {
      await db.createCollection(
        MONGODB_COLLECTION_NAME,
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
  } catch (error) {
    console.error('DB initialization error', error);
    process.exit(1);
  }
}

function find(collectionName, query) {
  return db.collection(collectionName).find(query).toArray();
}

function insertOne(collectionName, doc) {
  return db.collection(collectionName).insertOne(doc);
}

module.exports = { init, find, insertOne };
