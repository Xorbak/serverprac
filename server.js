const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const router = require("./router/index");
app.use(express.json());
// allows use of envs
require("dotenv").config();
//allows all
app.use(cors("*"));
//rate limiter
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 100 });
app.use(limiter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});

app.use("/", router);
// get cartoon quotes

//-----------------------------------------------------------------------AI apis
// image generation

// -----------------------------------------------------------------cartoon quotes run here

//--------------------------------------------------------------------------todo DB

/////////////////////////////////////////////////////////////add todo
app.get("/todo", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      document: {
        _id: req.query._id,
        input: req.query.input,
        status: req.query.status,
      },
    },
  };

  axios.request(options).then((result) => {
    console.log(req);
    res.json(result.data);
  });
});

///////////////////////////////////////////////////////////// add many - do I need it?
app.get("/todoMany", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertMany`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      documents: test,
    },
  };
  axios.request(options).then((result) => {
    console.log(req);
    res.json(result.data);
  });
});
//---------------------------------------------------------------------update todo
app.get("/todoupdate", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/updateOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      filter: { _id: req.query._id },
      update: { $set: { status: req.query.status } },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

///////////////////////////////////////////////////////// delete one
app.get("/tododelete", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/deleteOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
      filter: { _id: req.query._id },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
app.get("/todoget", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "todo",
      database: "xorbakData",
      dataSource: "Cluster0",
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
//------------------------------------------------------------------task management
//logging in
app.get("/db", (req, res) => {
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
// pull the correct task containers
app.get("/dbstatusContainers", (req, res) => {
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
//pull the tasks
app.get("/dbtasks", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "tasks",
      database: "manageThis",
      dataSource: "Cluster0",
      filter: { user_id: req.query.user_id },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

//===============================creating user

app.get("/dbcreateuser", (req, res) => {
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
