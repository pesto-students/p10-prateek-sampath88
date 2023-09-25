require("dotenv").config();
const express = require("express");
const url = require("url");
const cors = require("cors");
const axios = require("axios");
const app = express();

const API_URL_GEOCODE = process.env.API_URL_GEOCODE;
const API_URL_WEATHER = process.env.API_URL_WEATHER;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//Enable cors
app.use(cors());

app.get("/", async (req, res) => {
  const queryParams = url.parse(req.url, true).query;
  console.log(queryParams);
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    limit: 1,
    ...queryParams,
  });
  const finalUrl = `${API_URL_GEOCODE}?${params}`;
  const response = await axios.get(finalUrl);
  const city = response.data[0];
  console.log(city);
  const { lat, lon, name, country } = city;
  console.log(lat, lon, name, country);
  const weatherParams = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    lat,
    lon,
  });
  console.log(weatherParams);
  console.log(`${API_URL_WEATHER}?${weatherParams}`);
//   const result = await axios.get(`${API_URL_WEATHER}?${weatherParams}`);
//   console.log(result.data);
  res.status(200).json({});
});

module.exports = app;
