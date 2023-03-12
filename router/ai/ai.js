const express = require("express");
const aiChat = require("./aiChat");
const aiImage = require("./aiImage");
const rateLimit = require("express-rate-limit");
const aiRouter = express.Router();
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 1 });
const app = express();
app.use(limiter);
aiRouter.get("/", (req, res) => {
  res.json("Welcome to the AI zone");
});
aiRouter.use("/chat", aiChat);
aiRouter.use("/image", aiImage);

module.exports = aiRouter;
