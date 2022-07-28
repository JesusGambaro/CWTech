const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

app.get("/iecho", (req, res, next) => {
  const {text} = req.query;
  if (text) {
    return res.send({text: text.split("").reverse().join("")});
  }
  next(new Error("no text"));
});
app.get("*", (req, res) => {
  res.status(400).send({error: "no text"});
});
app.use((error, req, res, next) => {
  return error.message !== "no text"
    ? res.status(error.status || 500).send(error.message || "Server error")
    : res.status(400).send({error: error.message});
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
