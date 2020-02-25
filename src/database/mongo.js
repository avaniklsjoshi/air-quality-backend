import { MongoClient } from "mongodb";
import { DB_USERNAME, DB_PASSWORD } from "../../configs/constants";

let database = null;

/**
 * This function makes connections with DB
 * @return {Null} nothing
 */
export async function startDatabase() {
  const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@airqualityindex-grxrk.mongodb.net/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
  } catch (error) {
    console.log("DB error: ", error);
  } finally {
    // await client.close();
  }

  database = client.db("AirQuality");
}

/**
 * This function gets connected DB for further operations
 * @return {Null} nothing
 */
export async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}
