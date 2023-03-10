const express = require("express");
const aiChat = require("./aiChat");
const aiImage = require("./aiImage");

const aiRouter = express.Router();

aiRouter.get("/", (req, res) => {
  res.json("Welcome to the AI zone");
});
aiRouter.use("/chat", aiChat);
aiRouter.use("/image", aiImage);

module.exports = aiRouter;
