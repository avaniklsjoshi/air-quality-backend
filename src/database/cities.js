const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'cities';

async function insertCity(city) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(city);
  return insertedId;
}

async function getCities() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}


async function deleteCity(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
      _id: new ObjectID(id),
    });
  }
  
async function updateCity(id, city) {
    const database = await getDatabase();
    delete city._id;
    await database.collection(collectionName).update(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...city,
        },
      },
    );
}

module.exports = {
  insertCity,
  getCities,
  deleteCity,
  updateCity,
};
