const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://suphpdev:aiqOygEnPL9tOUmd@cluster0.gwdon.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("mitm-quotes");
    const quotesCollection = db.collection("quotes");

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000);
  })
  .catch((error) => console.error(error));
