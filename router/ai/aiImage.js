const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const aiImage = express.Router();

aiImage.get("/", (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_IMAGEGENERATION,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    const result = await openai.createImage({
      prompt: req.query.input,
      n: 1,
      size: "512x512",
    });

    console.log(result.data.data[0].url);
    res.json(result.data);
  };
  generateImage();
});

module.exports = aiImage;
