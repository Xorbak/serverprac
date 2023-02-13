const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();

// allows use of envs
require("dotenv").config();
//allows all
app.use(cors("*"));
//rate limiter
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 1 });
app.use(limiter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});
//Server home
app.get("/", (req, res) => {
  res.json("Server loaded");
});
//test
app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});
// get cartoon quotes
app.get("/quote", (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_CARTOON}`,
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
// image generation
app.get("/image", (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_IMAGEGENERATION,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async (p) => {
    const result = await openai.createImage({
      prompt: req.query.input,
      n: 1,
      size: "256x256",
    });

    console.log(result.data.data[0].url);
    res.json(result.data);
  };
  generateImage();
});
