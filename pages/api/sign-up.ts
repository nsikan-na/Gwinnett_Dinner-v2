import connectDB from "./db";
const bcrypt = require("bcrypt");

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const {
        username,
        password,
        confirmPassword,
      }: { username: string; password: string; confirmPassword: string } = data;
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
      const db: any = await connectDB();
      const userDataCollection: any = db.collection(
        `${process.env.DB_COLLECTION}`
      );
      const result: any = await userDataCollection.find({ username }).toArray();
      if (result.length > 0) {
        return res.json({
          success: false,
          message: "Username is already in use!",
        });
      }
      const hashedPassword: any = await bcrypt.hash(password, 10);
      await userDataCollection.insertOne({
        username,
        password: hashedPassword,
      });
      return res.json({ success: true });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
