const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
  const uri = "mongodb+srv://AirQualityIndexDB:AirQualityIndexDB123@airqualityindex-grxrk.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
  } catch(e) {
    console.log('DB error: ', e);
  } finally {
    // await client.close();
  }
 
  database = client.db('AirQuality');
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
