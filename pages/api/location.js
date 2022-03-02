export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { location } = JSON.parse(data);
      if (!location) {
        return res.json({
          success: false,
          message: "Please select a location!",
        });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
