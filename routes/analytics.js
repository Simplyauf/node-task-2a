const express = require("express");
const router = express.Router();
const { Analytic } = require("../models");
const xml2js = require("xml2js");
const bodyParser = require("body-parser");
const analyticLimiter = require("../middleware/rateLimit");

// Log widget click
router.post("/analytic", analyticLimiter, async (req, res) => {
  try {
    const { widget_name } = req.body;
    const browser_type = req.headers["user-agent"];

    await Analytic.create({
      widget_name,
      browser_type,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error logging analytics:", error);
    res.status(500).json({ error: "Failed to log analytics" });
  }
});

// Get click count
router.get("/clicks", async (req, res) => {
  try {
    const count = await Analytic.count();
    res.json({ count });
  } catch (error) {
    console.error("Error getting click count:", error);
    res.status(500).json({ error: "Failed to get click count" });
  }
});

// Export XML
router.get("/export-xml", async (req, res) => {
  try {
    const analytics = await Analytic.findAll({
      raw: true,
    });

    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ analytics: { record: analytics } });

    res.header("Content-Type", "application/xml");
    res.header("Content-Disposition", "attachment; filename=analytics.xml");
    res.send(xml);
  } catch (error) {
    console.error("Error exporting XML:", error);
    res.status(500).json({ error: "Failed to export XML" });
  }
});

// Import XML
router.post(
  "/import-xml",
  bodyParser.text({ type: "application/xml" }),
  async (req, res) => {
    try {
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(req.body);

      const records = result.analytics.record;

      await Analytic.bulkCreate(
        records.map((record) => ({
          widget_name: record.widget_name[0], // XML parser returns arrays for elements
          browser_type: record.browser_type[0],
        }))
      );

      res.json({ success: true });
    } catch (error) {
      console.error("Error importing XML:", error);
      res.status(500).json({ error: "Failed to import XML" });
    }
  }
);

module.exports = router;
