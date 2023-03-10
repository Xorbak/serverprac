const express = require("express");
const axios = require("axios");
const quoteAdd = express.Router();

quoteAdd.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "cartoonQuotes",
      database: "xorbakData",
      dataSource: "Cluster0",
      document: {
        quote: req.query.quote,
        name: req.query.name,
        cartoon: req.query.quote,
      },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

module.exports = quoteAdd;
