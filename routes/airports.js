const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Read airports data from JSON file
const airportsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../airportdata.json"), "utf8")
);

router.get("/airports", (req, res) => {
  const searchTerm = req.query.search.toLowerCase();

  if (searchTerm.length < 3) {
    return res.json([]);
  }

  const matches = airportsData
    .filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchTerm) ||
        airport.ident.toLowerCase().includes(searchTerm) ||
        (airport.municipality &&
          airport.municipality.toLowerCase().includes(searchTerm))
    )
    .map((airport) => ({
      id: airport.id,
      name: airport.name,
      ident: airport.ident,
      municipality: airport.municipality,
      country: airport.iso_country,
      latitude: parseFloat(airport.latitude_deg),
      longitude: parseFloat(airport.longitude_deg),
    }))
    .slice(0, 10); // Limit to 10 results for performance

  res.json(matches);
});

module.exports = router;
