import db from "./db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { username, password, confirmPassword } = data;
    if (!username || !password) {
      return res.json({
        success: false,
        message: "Please complete all fields!",
      });
    }
    if (password != confirmPassword)
      return res.json({
        success: false,
        message: "Password and password confirmation do not match!",
      });
    await db.execute(
      `INSERT INTO user_data (username,password) VALUES('${username}','${password}')`
    );
    res.json({ success: true });
  }
}