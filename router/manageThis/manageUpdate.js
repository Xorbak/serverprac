const express = require("express");
const axios = require("axios");

const taskUpdate = express.Router();

taskUpdate.get("/", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/updateOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "tasks",
      database: "manageThis",
      dataSource: "Cluster0",
      filter: { task_id: req.query.task_id },
      update: { $set: { container: req.query.container } },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
module.exports = taskUpdate;
