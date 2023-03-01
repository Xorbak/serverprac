const express = require("express");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();

// allows use of envs
require("dotenv").config();
//allows all
app.use(cors("*"));
//rate limiter
const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 1000 });
app.use(limiter);

app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});
//Server home
app.get("/", (req, res) => {
  res.json("Server loaded");
});
//test
app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});
// get cartoon quotes
app.get("/quote", (req, res) => {
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_CARTOON}`,
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
//-----------------------------------------------------------------------AI apis
// image generation
app.get("/image", (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_IMAGEGENERATION,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async (p) => {
    const result = await openai.createImage({
      prompt: req.query.input,
      n: 1,
      size: "1024x1024",
    });

    console.log(result.data.data[0].url);
    res.json(result.data);
  };
  generateImage();
});

app.get("/chat", (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_IMAGEGENERATION,
  });
  const openai = new OpenAIApi(configuration);
  const generateChat = async (p) => {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.query.input,
      temperature: 0,
      max_tokens: 2000,
    });

    console.log(result);
    res.json(result.data.choices[0]);
  };
  generateChat();
});
// -----------------------------------------------------------------cartoon quotes run here
app.get("/mongoQuote", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/find`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "cartoonQuotes",
      database: "xorbakData",
      dataSource: "Cluster0",
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});

app.get("/mongoQuoteAdd", (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.REACT_APP_DBCALL}/insertOne`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.REACT_APP_DBAPI,
    },
    data: {
      collection: "cartoonQuotes",
      database: "xorbakData",
      dataSource: "Cluster0",
      document: {
        quote: req.query.quote,
        name: req.query.name,
        cartoon: req.query.quote,
      },
    },
  };
  axios.request(options).then((result) => {
    res.json(result.data);
  });
});
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
