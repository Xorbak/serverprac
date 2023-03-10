const express = require("express");
const testRouter = require("./test/testRouter");
const quote = require("./quotes/quotes");
const aiRouter = require("./ai/ai");
const todoRoutes = require("./todo/todo");
const manageThisRouter = require("./manageThis/manageThisRouter");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Server loaded");
});
router.use("/test", testRouter);
router.use("/quote", quote);
router.use("/ai", aiRouter);
router.use("/todo", todoRoutes);
router.use("/manage", manageThisRouter);

module.exports = router;
