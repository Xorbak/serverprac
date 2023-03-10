const express = require("express");
//these all fall under  /api
const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

testRouter.get("/check", (req, res) => {
  res.json({ users: ["does", "this", "work", "?"] });
});

module.exports = testRouter;
