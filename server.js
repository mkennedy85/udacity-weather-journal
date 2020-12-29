// Setup empty JS object to act as endpoint for all routes
projectData = [];
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
const getRecentData = function (req, res) {
  let recentEntry = projectData[projectData.length - 1];
  res.send(JSON.stringify(recentEntry));
};

app.get("/recent", getRecentData);

// Get all journalEntry items in projectData
const getAllData = function (req, res) {
  res.send(JSON.stringify(projectData));
};

app.get("/all", getAllData);

// Endpoint to post data to the projectData dict
const postData = function (req, res) {
  const newData = req.body;
  let journalEntry = {};
  journalEntry.temperature = newData.main.temp;
  journalEntry.date = newData.date;
  journalEntry.feelings = newData.feelings;
  projectData.push(journalEntry);
  res.send(journalEntry);
};

app.post("/journal", postData);
