const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const req = require("express/lib/request");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://suphpdev:aiqOygEnPL9tOUmd@cluster0.gwdon.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString)
  .then((client) => {
    const db = client.db("mitm-quotes");
    const quotesCollection = db.collection("quotes");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
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
          res.json(`Deleted Walt's quote`);
        })
        .catch((error) => console.error(error));
    });
    app.listen(3000);
  })
  .catch((error) => console.error(error));
