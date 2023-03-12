const express = require("express");
const axios = require("axios");
const manageLogin = require("./manageLogin");
const manageContainer = require("./manageContainer");
const manageTask = require("./managetask");
const manageNewUser = require("./manageNewUser");
const rateLimit = require("express-rate-limit");
const checkNewUser = require("./taskCheckUser");

const app = express();
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 100 });
app.use(limiter);

const manageThisRouter = express.Router();

manageThisRouter.get("/", (req, res) => {
  res.json("Welcome to the Managed zone");
});
manageThisRouter.use("/login", manageLogin);
manageThisRouter.use("/container", manageContainer);
manageThisRouter.use("/task", manageTask);
manageThisRouter.use("/newuser", manageNewUser);
manageThisRouter.use("/check", checkNewUser);
module.exports = manageThisRouter;
