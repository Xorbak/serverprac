const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const checkNewUser = express.Router();

checkNewUser.get("/", (req, res) => {
  //generate salt
  const usercreation = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/findOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "users",
      database: "manageThis",
      dataSource: "Cluster0",
      filter: { username: req.query.username },
    },
  };
  axios.request(usercreation).then((result) => {
    if (result.data.document != null) {
      res.json({ error: "Username already exists" });
    } else {
      res.json({ response: "Username Available" });
    }
  });

  //end
});

module.exports = checkNewUser;
