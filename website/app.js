/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "536157ba951470b08050f80a589d9838";
const generateButton = document.getElementById("generate");
let weatherData = {};
let postedEntry = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getWeatherApiData = async (url = "", zip = "", key = "") => {
  const request = await fetch(`${url}?zip=${zip}&appid=${key}`);

  try {
    weatherData = await request.json();
  } catch (error) {
    console.log("error", error);
  }
};

const postWeatherJournalEntry = async (url = "", data = {}) => {
  let feelings = document.getElementById("feelings").value;
  data.feelings = feelings;
  data.date = newDate;

  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    let postedEntry = await request.json();
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async (url = "", postedEntry = {}) => {
  const request = await fetch(url);

  try {
    let latestEntry = await request.json();
    document.getElementById("date").innerHTML = latestEntry.date;
    document.getElementById("temp").innerHTML = latestEntry.temperature;
    document.getElementById("content").innerHTML = latestEntry.feelings;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = function () {
  let zip = document.getElementById("zip").value;
  getWeatherApiData((url = baseUrl), (zip = zip), (key = apiKey)).then(function (data) {
    postWeatherJournalEntry("/journal", weatherData).then(function (data) {
      updateUI("/data", postedEntry);
    });
  });
};

generateButton.addEventListener("click", postData);
