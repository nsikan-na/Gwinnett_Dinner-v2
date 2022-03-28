import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { cardName }: { cardName: string } = req.body;
      if (!cardName) {
        return res.json({
          success: false,
          message: "Please enter the name on the card!",
        });
      }
      return res.json({ success: true });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
