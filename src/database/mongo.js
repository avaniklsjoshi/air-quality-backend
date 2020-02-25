const {MongoClient} = require('mongodb');
const {DB_USERNAME, DB_PASSWORD}= require('../../configs/constants');

let database = null;

/**
 * This function makes connections with DB
 * @return {Null} nothing
 */
async function startDatabase() {
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@airqualityindex-grxrk.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
  } catch (e) {
    console.log('DB error: ', e);
  } finally {
    // await client.close();
  }

  database = client.db('AirQuality');
}

/**
 * This function gets connected DB for further operations
 * @return {Null} nothing
 */
async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
