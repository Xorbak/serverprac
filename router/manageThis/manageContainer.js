const express = require("express");
const axios = require("axios");

const manageContainer = express.Router();

manageContainer.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "taskContainers",
      database: "manageThis",
      dataSource: "Cluster0",
      filter: { user_id: req.query.user_id },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

manageContainer.get("/addContainer", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "taskContainers",
      database: "manageThis",
      dataSource: "Cluster0",
      document: {
        status_id: "servertest",
        user_id: "1678701490173",
        container: "servertest",
      },
    },
  };

  axios.request(options).then((result) => {
    console.log(req);
    res.json(result.data);
  });
});

module.exports = manageContainer;
