const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const manageNewUser = express.Router();

manageNewUser.get("/", async (req, res) => {
  async function hashPassword() {
    const password = await bcrypt.hash(req.query.password, 10);
    let id = Date.now();
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
          password: password,
          _id: id,
        },
      },
    };
    axios.request(options).then((result) => {
      const containerOptions = {
        method: "POST",
        url: `${process.env.REACT_APP_DBCALL}/insertMany`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.REACT_APP_DBAPI,
        },
        data: {
          collection: "taskContainers",
          database: "manageThis",
          dataSource: "Cluster0",
          documents: [
            {
              status_id: "pending",
              user_id: id.toString(),
              container: "pending",
            },
            { status_id: "busy", user_id: id.toString(), container: "busy" },
            {
              status_id: "completed",
              user_id: id.toString(),
              container: "completed",
            },
          ],
        },
      };

      axios.request(containerOptions).then((response) => {
        res.json(response.data);
      });
    });
  }

  hashPassword();
});

module.exports = manageNewUser;
