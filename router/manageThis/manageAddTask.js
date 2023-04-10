const express = require("express");
const axios = require("axios");

const taskAdd = express.Router();

taskAdd.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "tasks",
      database: "manageThis",
      dataSource: "Cluster0",
      document: {
        task_id: req.query.task_id,
        user_id: req.query.user_id,
        container: req.query.container,
        task: req.query.task,
        created: req.query.created,
        discription: req.query.discription,
      },
    },
  };

  axios.request(options).then((result) => {
    console.log(req);
    res.json(result.data);
  });
});

module.exports = taskAdd;
