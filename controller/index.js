import { executeQuery } from "../config/db";
const getAllUsers = async (req, res) => {
  const userData = await executeQuery(`SELECT * FROM 'user'`, []);
  res.send(userData);
};

export { getAllUsers };
