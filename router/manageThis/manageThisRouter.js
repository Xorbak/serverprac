const express = require("express");
const axios = require("axios");
const manageLogin = require("./manageLogin");
const manageContainer = require("./manageContainer");
const manageTask = require("./managetask");
const manageNewUser = require("./manageNewUser");

const manageThisRouter = express.Router();

manageThisRouter.get("/", (req, res) => {
  res.json("Welcome to the Managed zone");
});
manageThisRouter.use("/login", manageLogin);
manageThisRouter.use("/container", manageContainer);
manageThisRouter.use("/task", manageTask);
manageThisRouter.use("/newuser", manageNewUser);

module.exports = manageThisRouter;
