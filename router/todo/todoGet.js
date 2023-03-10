const express = require("express");
const axios = require("axios");

const todoGet = express.Router();

todoGet.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

module.exports = todoGet;
