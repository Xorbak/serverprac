const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

app.get("/quote", (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_CARTOON}`,
  };

  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
