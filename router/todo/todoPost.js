const express = require("express");
const axios = require("axios");

const todoPost = express.Router();

todoPost.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      document: {
        _id: req.query._id,
        input: req.query.input,
        status: req.query.status,
      },
    },
  };

  axios.request(options).then((result) => {
    console.log(req);
    res.json(result.data);
  });
});

module.exports = todoPost;
