import db from "./db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try{
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
        message: "Passwords do not match!",
      });
    const getAllUserNames = await db.execute(
      `SELECT username FROM user_data WHERE username = '${username}'`
    );
    if (getAllUserNames[0].length == 0) {
      return res.json({
        success: false,
        message: `No account has "${username}" as username!`,
      });
    }
    if (getAllUserNames[0].length != 0) {
      await db.execute(
        `Update user_data SET password='${password}' WHERE username ='${username}'`
      );
    }
    res.json({ success: true });
  }
  catch (err) {
    console.log(error.message);
  }
}
}
