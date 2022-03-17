export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { zipCode, locationZipCodes, curLocation } = req.body;
      if (!zipCode) {
        return res.json({
          success: false,
          message: "Please enter a valid Zip Code!",
        });
      }
      if (
        !locationZipCodes.some((location) => {
          return location == zipCode;
        })
      ) {
        return res.json({
          success: false,
          message: `The ${curLocation} location only delivers to ${locationZipCodes}!`,
        });
      }
      return res.json({ success: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}
