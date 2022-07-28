const express = require("express"); //import express
const app = express(); //create express app
const port = process.env.PORT || 3001; //port to listen on
const cors = require("cors"); //import cors
app.use(cors()); //use cors for cross origin resource sharing

//get request to /iecho
app.get("/iecho", (req, res, next) => {
  const {text} = req.query; //get text from query
  if (text) {
    //if text is not empty
    return res.send({text: text.split("").reverse().join("")}); //send reversed text
  }
  //if text is empty or not existent
  next(new Error("no text"));
});

//get request to anything else
app.get("*", (req, res) => {
  res.status(400).send({error: "no text"});
});

//error handler
app.use((error, req, res, next) => {
  return error.message !== "no text"
    ? res.status(error.status || 500).send(error.message || "Server error") //if error message is not "no text"
    : res.status(400).send({error: error.message}); //if error message is "no text"
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
