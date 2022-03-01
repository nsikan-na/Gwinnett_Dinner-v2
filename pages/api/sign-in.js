import db from "./db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({
          success: false,
          message: "Please complete all fields!",
        });
      }
      const query = await db.execute(
        `SELECT * FROM user_data WHERE username = "${username}"`
      );
      console.log(JSON.parse(query));
      const queryUserData = query[0];
      const validateUser = queryUserData.some((user) => {
        return password == user.password;
      });
      if (!validateUser) {
        return res.json({
          success: false,
          message: "Please enter valid password and username!",
        });
      }
      return res.json({ success: true });
    } catch (err) {
      console.log(err.message);
    }
  }
}
