const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
async function getDb() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ewgfl.mongodb.net/${process.env.DB_DATABASE}`
    );
    return client.db();
  } catch (error) {
    throw error;
  }
}

exports.getDb = getDb;
