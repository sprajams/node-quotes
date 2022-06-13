// tell app to use express by requiring it
const express = require("express");
const app = express();
// create server for browser to connect to
app.listen(3000);
require("dotenv").config();

// body-parser is a middleware, helps handle data from <form>
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const req = require("express/lib/request");

app.set("view engine", "ejs");

app.use(express.static("public"));

// extract data from <form> and add to body of req object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db, quotesCollection;
let dbConnectionString = process.env.connectionString;
// connecting to MongoDB
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(dbConnectionString)
  .then((client) => {
    db = client.db("mitm-quotes");
    quotesCollection = db.collection("quotes");
  })
  .catch((error) => console.error(error));

// allows browser to perform the read operation
app.get("/", (req, res) => {
  quotesCollection
    .find()
    .toArray()
    .then((results) => {
      res.render("index.ejs", { quotes: results });
    })
    .catch((error) => console.error(error));
});

// create operation
app.post("/quotes", (req, res) => {
  quotesCollection
    .insertOne(req.body) // add items into MongoDB collection
    .then((result) => {
      res.redirect("/"); // refresh back to root
    })
    .catch((error) => console.error(error));
});
app.put("/quotes", (req, res) => {
  quotesCollection
    .findOneAndUpdate(
      { name: "Hal" },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      { upsert: true }
    )
    .then((result) => {
      res.json("Success");
    })
    .catch((error) => console.error(error));
});

app.delete("/quotes", (req, res) => {
  quotesCollection
    .deleteOne({ name: req.body.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json(`No quote to delete`);
      }
      res.json(`Deleted Walt's quote`);
    })
    .catch((error) => console.error(error));
});
