const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");

router.get("/api/times", (req, res) => {
  const times = {
    nigeria: moment().tz("Africa/Lagos").format("HH:mm:ss"),
    london: moment().tz("Europe/London").format("HH:mm:ss"),
    pakistan: moment().tz("Asia/Karachi").format("HH:mm:ss"),
    est: moment().tz("America/New_York").format("HH:mm:ss"),
  };

  res.json(times);
});

module.exports = router;
