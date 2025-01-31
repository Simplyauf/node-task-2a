const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/reddit-posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.reddit.com/r/programming.json"
    );
    const posts = response.data.data.children
      .filter((post, index) => index % 2 === 0) // Get even posts
      .slice(0, 4)
      .map((post) => ({
        title: post.data.title,
        link: `https://reddit.com${post.data.permalink}`,
        author: post.data.author,
      }));

    res.json(posts);
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

module.exports = router;
