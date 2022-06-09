console.log("may node be with you");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log("bork");
  console.log(req.body);
});

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://suphpdev:aiqOygEnPL9tOUmd@cluster0.gwdon.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
});
