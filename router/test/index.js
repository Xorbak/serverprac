const express = require("express");
//these all fall under  /api
const testRouter2 = express.Router();

testRouter2.get("/", (req, res) => {
  res.json({ users: ["ddwd", "uswdwdqr2", "udqwdqwder3", "usdqwdqwdqer4"] });
});

testRouter2.get("/check", (req, res) => {
  res.json({ users: ["doesdqwqwd", "thidqwdqwds", "wodqwdqwdrk", "?"] });
});

module.exports = testRouter2;
