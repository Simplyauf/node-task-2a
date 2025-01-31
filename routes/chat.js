const express = require("express");
const router = express.Router();
const { Chat } = require("../models");
const { createClient } = require("redis");

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.connect().catch(console.error);

// Keep track of message version for polling
let messageVersion = 0;

// Render chat page
router.get("/chat", (req, res) => {
  res.render("chat");
});

// Get all messages
router.get("/chat/all", async (req, res) => {
  try {
    const messages = await redis.lRange("chat_messages", 0, -1);
    res.json({ messages: messages.map((msg) => JSON.parse(msg)) });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Send message
router.post("/send", async (req, res) => {
  try {
    const { message } = req.body;
    const messageObj = {
      text: message,
      timestamp: new Date().toISOString(),
    };

    await redis.rPush("chat_messages", JSON.stringify(messageObj));
    messageVersion++;

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Long polling endpoint
router.get("/poll", async (req, res) => {
  const clientVersion = parseInt(req.query.version) || 0;

  // Wait for up to 30 seconds
  let attempts = 0;
  const checkVersion = async () => {
    if (messageVersion > clientVersion) {
      res.json({ version: messageVersion });
    } else if (attempts >= 30) {
      res.status(304).end();
    } else {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      checkVersion();
    }
  };

  checkVersion();
});

// Save chat to database
router.post("/save", async (req, res) => {
  try {
    const messages = await redis.lRange("chat_messages", 0, -1);
    await Chat.create({
      chat_messages: JSON.stringify(messages.map((msg) => JSON.parse(msg))),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

module.exports = router;
