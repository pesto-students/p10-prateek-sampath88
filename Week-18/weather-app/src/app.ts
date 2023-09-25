require("dotenv").config();
import express from "express";
import cors from "cors";
import url from "url";
import axios from "axios";

const app = express();
// //Enable cors
app.use(cors());

//import routes here
import weatherRoute from "./routes/weather";

//use routes here
app.use("/api/v1", weatherRoute);



app.get("/", (req, res) => {
  res.status(200).send({ success: true });
});

// app.get("/", async (req, res) => {
//   const queryParams = url.parse(req.url, true).query;
//   console.log(queryParams);
//   const params = new URLSearchParams({
//     [API_KEY_NAME]: API_KEY_VALUE,
//     limit: 1,
//     ...queryParams,
//   });
//   const finalUrl = `${API_URL_GEOCODE}?${params}`;
//   const response = await axios.get(finalUrl);
//   const city = response.data[0];
//   console.log(city);
//   const { lat, lon, name, country } = city;
//   console.log(lat, lon, name, country);
//   const weatherParams = new URLSearchParams({
//     [API_KEY_NAME]: API_KEY_VALUE,
//     lat,
//     lon,
//   });
//   console.log(weatherParams);
//   console.log(`${API_URL_WEATHER}?${weatherParams}`);
// //   const result = await axios.get(`${API_URL_WEATHER}?${weatherParams}`);
// //   console.log(result.data);
//   res.status(200).json({});
// });

export default app;
