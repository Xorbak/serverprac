const express = require("express");
const axios = require("axios");

const manageNewUser = express.Router();

manageNewUser.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "users",
      database: "manageThis",
      dataSource: "Cluster0",
      document: {
        username: req.query.username,
        name: req.query.name,
        surname: req.query.surname,
        password: req.query.password,
        _id: Date.now(),
      },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

module.exports = manageNewUser;
