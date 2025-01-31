const express = require("express");
const router = express.Router();

router.post("/calculate-coins", (req, res) => {
  try {
    let amount = parseFloat(req.body.amount);
    amount = Math.round(amount * 100) / 100; // Round to 2 decimal places

    const bills = {
      $20: Math.floor(amount / 20),
      $10: Math.floor((amount % 20) / 10),
      $5: Math.floor((amount % 10) / 5),
      $1: Math.floor((amount % 5) / 1),
      "25¢": Math.floor(((amount % 1) * 100) / 25),
      "10¢": Math.floor((((amount % 1) * 100) % 25) / 10),
      "5¢": Math.floor((((amount % 1) * 100) % 10) / 5),
      "1¢": Math.floor(((amount % 1) * 100) % 5),
    };

    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate coins" });
  }
});

module.exports = router;
