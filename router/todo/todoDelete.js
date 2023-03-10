const express = require("express");
const axios = require("axios");

const todoDelete = express.Router();

todoDelete.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/deleteOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      filter: { _id: req.query._id },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

module.exports = todoDelete;
