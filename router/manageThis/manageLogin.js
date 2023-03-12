const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const manageLogin = express.Router();

manageLogin.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "users",
      database: "manageThis",
      dataSource: "Cluster0",
    },
  };
  axios.request(options).then((result) => {
    const userData = result.data.documents.filter((i) => {
      const activeUser =
        i.username == "hash" && bcrypt.compare("1234", i.password);

      return activeUser;
    });
    const currentUserId = userData[0]
      ? {
          id: userData[0]._id,
          name: userData[0].name,
          surname: userData[0].surname,
          username: userData[0].username,
        }
      : { error: "Incorrect username or password" };
    res.json(currentUserId);
  });
});

module.exports = manageLogin;
