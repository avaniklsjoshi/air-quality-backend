import { getDatabase } from "./mongo";
import { ObjectID } from "mongodb";
import { COLLECTION_NAME } from "../../configs/constants";

/**
 * This function insert city data in DB
 * @param {Object} city information
 * @return {string} id
 */
export async function insertCity(city) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(COLLECTION_NAME)
    .insertOne(city);
  return insertedId;
}

/**
 * This function gets city data from DB
 * @return {Array} all cities array
 */
export async function getCities() {
  const database = await getDatabase();
  return await database
    .collection(COLLECTION_NAME)
    .find({})
    .toArray();
}

/**
 * This function delete city data in DB
 * @param {string} id city id information
 * @return {Null} nothing
 */
export async function deleteCity(id) {
  const database = await getDatabase();
  await database.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectID(id)
  });
}

/**
 * This function update city info
 * @param {string} id city id information
 * @param {Object} city information
 * @return {Null} nothing
 */
export async function updateCity(id, city) {
  const database = await getDatabase();
  delete city._id;
  await database.collection(COLLECTION_NAME).update(
    { _id: new ObjectID(id) },
    {
      $set: {
        ...city
      }
    }
  );
}

module.exports = {
  insertCity,
  getCities,
  deleteCity,
  updateCity
};
