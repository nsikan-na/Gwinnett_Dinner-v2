import { MongoClient } from "mongodb";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { username, password, confirmPassword } = data;
      if (!username || !password || !confirmPassword) {
        return res.json({
          success: false,
          message: "Please complete all fields!",
        });
      }
      if (password != confirmPassword) {
        return res.json({
          success: false,
          message: "Passwords do not match!",
        });
      }
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ewgfl.mongodb.net/${process.env.DB_DATABASE}`
      );
      const db = client.db();
      const userDataCollection = db.collection(`${process.env.DB_COLLECTION}`);
      const result = await userDataCollection.find({ username }).toArray();
      if (result.length > 0) {
        return res.json({
          success: false,
          message: "Username is already in use!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await userDataCollection.insertOne({
        username,
        password: hashedPassword,
      });
      client.close();
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
