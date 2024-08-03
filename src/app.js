const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./routes");

const app = express();
require('dotenv').config()
// var corsOptions = {};
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
});

app.get("/*", function response(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

  next();
});

// Mount the API routes
app.use("/api/v1", routes);

module.exports = app;
