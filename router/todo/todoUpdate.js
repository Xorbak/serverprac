const express = require("express");
const axios = require("axios");

const todoUpdate = express.Router();

todoUpdate.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/updateOne`,
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
      update: { $set: { status: req.query.status } },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
module.exports = todoUpdate;
