// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;

// Require Express to run server and routes
const express = require("express");
const fetch = require("node-fetch");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// Endpoint to get most recent projectData journalEntry
const getData = function (req, res) {
  res.send(JSON.stringify(projectData));
};

app.get("/data", getData);

// Endpoint to post data to the projectData dict
const postData = function (req, res) {
  const newData = req.body;
  projectData.temperature = newData.main.temp;
  projectData.date = newData.date;
  projectData.feelings = newData.feelings;
  res.send(projectData);
};

app.post("/journal", postData);
