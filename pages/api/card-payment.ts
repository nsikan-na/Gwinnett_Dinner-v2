export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cardName } = req.body;
      if (!cardName) {
        return res.json({
          success: false,
          message: "Please enter the name on the card!",
        });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
