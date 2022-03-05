const getDb = require("./db").getDb;
import bcrypt from "bcrypt";
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
      if (password != confirmPassword)
        return res.json({
          success: false,
          message: "Passwords do not match!",
        });
      const db = await getDb();
      const userDataCollection = db.collection(`${process.env.DB_COLLECTION}`);
      const result = await userDataCollection.find({ username }).toArray();
      if (result.length == 0) {
        return res.send({
          success: false,
          message: `No account has "${username}" as username!`,
        });
      }
      if (result.length != 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userDataCollection.updateOne(
          { username },
          { $set: { password: hashedPassword } }
        );
        return res.json({ success: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
