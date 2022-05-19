const express = require("express");
const axios = require("axios");
const cors = require("cors");
const API_KEY = require("../config.js");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/../dist"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.get("/completionRequest/:prompt", (req, res) => {
  console.log(req.params.prompt);
});
