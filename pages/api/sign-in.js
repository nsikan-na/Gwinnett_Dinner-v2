import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { username, password } = JSON.parse(data);
      if (!username || !password) {
        return res.json({
          success: false,
          message: "Please complete all fields!",
        });
      }
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ewgfl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
      );
      const db = client.db();
      const userDataCollection = db.collection(`${process.env.DB_COLLECTION}`);
      const result = await userDataCollection
        .find({ username: username })
        .toArray();
      client.close();
      const validateUser = result.some((user) => {
        return password == user.password;
      });
      if (!validateUser) {
        return res.json({
          success: false,
          message: "Please enter valid password and username!",
        });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
