const express = require("express");
const router = express.Router();
const axios = require("axios");

const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Add this to your .env file
const CITY = "London"; // Change this to your desired city

router.get("/current", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${CITY}&aqi=no`
    );

    console.log(response);

    const weather = {
      temp_c: response.data.current.temp_c,
      condition: response.data.current.condition.text.toLowerCase(),
      icon: getWeatherIcon(response.data.current.condition.text.toLowerCase()),
      last_updated: new Date().toISOString(),
    };

    res.json(weather);
  } catch (error) {
    console.error("Weather API Error:", error);
    res.status(500).json({
      error: "Failed to fetch weather data",
      message: error.response?.data?.error?.message || error.message,
    });
  }
});

function getWeatherIcon(condition) {
  if (condition.includes("sunny") || condition.includes("clear")) {
    return "/images/sunny.png";
  } else if (condition.includes("rain")) {
    return "/images/rainy.png";
  } else if (condition.includes("snow")) {
    return "/images/snowy.png";
  } else {
    return "/images/cloudy.png";
  }
}

module.exports = router;
