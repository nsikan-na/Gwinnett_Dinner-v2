import * as mongoDB from "mongodb";
const MongoClient = mongoDB.MongoClient;
export default async function handler() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ewgfl.mongodb.net/${process.env.DB_DATABASE}`
    );
    return client.db();
  } catch (error: any) {
    console.log(error.message);
  }
}
