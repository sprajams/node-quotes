const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://suphpdev:aiqOygEnPL9tOUmd@cluster0.gwdon.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("mitm-quotes");
    const quotesCollection = db.collection("quotes");
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set("view engine", "ejs");

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
      console.log(req.body);
    });
    app.listen(3000);
  })
  .catch((error) => console.error(error));
