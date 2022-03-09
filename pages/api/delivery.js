export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { zipCode, locationZipCodes, curLocation } = req.body;
      if (!zipCode) {
        return res.json({
          success: false,
          message: "Please enter a valid zipCode!",
        });
      }
      if (isNaN(zipCode)) {
        return res.json({
          success: false,
          message: "Zip Code must be a number!",
        });
      }
      if (zipCode.length != 5) {
        return res.json({
          success: false,
          message: "Zip Code must be 5 characters long!",
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
