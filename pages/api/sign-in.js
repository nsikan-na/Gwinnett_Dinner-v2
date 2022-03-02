import { MongoClient } from "mongodb";
const bcrypt = require("bcrypt");
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { username, password } = data;
      if (!username || !password) {
        return res.json({
          success: false,
          message: "Please complete all fields!",
        });
      }
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ewgfl.mongodb.net/${process.env.DB_DATABASE}`
      );

      const db = client.db();
      const userDataCollection = db.collection(`${process.env.DB_COLLECTION}`);
      const result = await userDataCollection.find({ username }).toArray();
      if (result.length == 0) {
        res.json({
          success: false,
          message: "Please enter valid username and password!",
          showForget:true
        });
      }
      client.close();
      const validateUser = await bcrypt.compare(password, result[0].password);

      if (!validateUser) {
        return res.json({
          success: false,
          message: "Please enter valid username and password!",
          showForget:true

        });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
