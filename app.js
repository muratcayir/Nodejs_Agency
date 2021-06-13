const express = require("express");
const ejs = require('ejs');
const mongoose = require("mongoose");

const pageRoute = require('./routes/pageRoute')





const app = express();

// -- CONNECT DB --
mongoose.connect("mongodb://localhost/Agency-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//--TEMPLATE ENGİNE--
app.set("view engine", "ejs");


//--MIDDLEWARE--
app.use(express.static("public"));


//ROUTES

app.use('/',pageRoute)

const port = 5000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
