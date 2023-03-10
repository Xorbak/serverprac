const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const aiChat = express.Router();

aiChat.get("/", (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_IMAGEGENERATION,
  });
  const openai = new OpenAIApi(configuration);
  const generateChat = async (p) => {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.query.input,
      temperature: 0,
      max_tokens: 2000,
    });

    console.log(result);
    res.json(result.data.choices[0]);
  };
  generateChat();
});

module.exports = aiChat;
