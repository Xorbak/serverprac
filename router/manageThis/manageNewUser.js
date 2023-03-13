const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const manageNewUser = express.Router();

manageNewUser.get("/", (req, res) => {
  //generate salt

  bcrypt.genSalt(10, (err, salt) => {
    //hash pw
    bcrypt.hash(req.query.password, salt, function (err, hash) {
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
            password: hash,
            _id: Date.now(),
          },
        },
      };
      axios.request(options).then((result) => {
        res.json(result.data);
      });
    });
  });

  //end
});

module.exports = manageNewUser;
