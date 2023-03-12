const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const router = require("./router/index");

app.use(express.json());
// allows use of envs
require("dotenv").config();
//allows all
app.use(cors("*"));
//rate limiter
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 1000 });
app.use(limiter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});

app.use("/", router);
