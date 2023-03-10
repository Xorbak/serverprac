const express = require("express");
const axios = require("axios");

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
      return (
        i.username == req.query.username && i.password == req.query.password
      );
    });
    const currentUserId = userData[0]
      ? {
          id: userData[0]._id,
          name: userData[0].name,
          surname: userData[0].surname,
          username: userData[0].username,
        }
      : { error: "incorrect username or password" };
    res.json(currentUserId);
  });
});

module.exports = manageLogin;
