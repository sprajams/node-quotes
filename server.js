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

// tell Express we are using EJS as the templating engine
app.set("view engine", "ejs");
// express.static is an Express middleware making public folder accessible to all
app.use(express.static("public"));

// extract data from <form> and add to body of req object
app.use(bodyParser.urlencoded({ extended: true }));
// use middleware to tell our server to accept JSON
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
    .find() // returns an object that contains all quotes from our db and contains toArray()
    .toArray() // method to convert our data object into an array
    .then((data) => {
      res.render("index.ejs", { quotes: data }); //render method through Express's response to render HTML, passing in our data
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

//handles put requests aka update operation
app.put("/quotes", (req, res) => {
  quotesCollection
    .findOneAndUpdate(
      { name: "Hal" }, // filter collection with this key-value pair
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote,
        },
      }, // use the set operator to update to change quotes
      { upsert: true } // insert document if none can be updated
    )
    //response to JS that sent the PUT request with success message
    .then((result) => {
      res.json("Success");
    })
    .catch((error) => console.error(error));
});

app.delete("/quotes", (req, res) => {
  quotesCollection
    .deleteOne({ name: req.body.name })
    .then((result) => {
      // respond with a diff message depending on if there is a quote to delete or not
      if (result.deletedCount === 0) {
        return res.json(`No quote to delete`);
      }
      res.json(`Deleted Walt's quote`);
    })
    .catch((error) => console.error(error));
});
