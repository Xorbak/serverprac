const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();
require("dotenv").config();
//delete if not working
app.use(
  cors({
    origin: "https://xorbak.github.io/",
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});

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
