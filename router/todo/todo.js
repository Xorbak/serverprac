const express = require("express");
const todoDelete = require("./todoDelete");
const todoGet = require("./todoGet");
const todoPost = require("./todoPost");
const todoUpdate = require("./todoUpdate");

const todoRoutes = express.Router();

todoRoutes.use("/", todoGet);
todoRoutes.use("/post", todoPost);
todoRoutes.use("/update", todoUpdate);
todoRoutes.use("/delete", todoDelete);

module.exports = todoRoutes;
