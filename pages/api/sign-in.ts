import { connectToDatabase } from "../../util/db";
const bcrypt = require("bcrypt");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { username, password }: { username: string; password: string } =
        data;
      if (!username || !password) {
        return res.json({
          success: false,
          message: "Please complete all fields!",
        });
      }

      const { db } = await connectToDatabase();

      const result: any = await db
        .collection(`userData`)
        .find({ username })
        .toArray();
        
      if (result.length == 0) {
        res.json({
          success: false,
          message: "Please enter valid username and password!",
          showForget: true,
        });
      }
      const validateUser: any = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!validateUser) {
        return res.json({
          success: false,
          message: "Please enter valid username and password!",
          showForget: true,
        });
      }
      return res.json({ success: true });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
