const express = require("express");
const quoteAdd = require("./quoteAdd");
const axios = require("axios");
const quote = express.Router();

quote.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "cartoonQuotes",
      database: "xorbakData",
      dataSource: "Cluster0",
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

quote.use("/add", quoteAdd);

module.exports = quote;
