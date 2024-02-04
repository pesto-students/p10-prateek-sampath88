import express from "express";
import { getCurrentWeather, getWeatherForecast, getWeather, getLatLonByCityName } from "./controller";

const router = express.Router();

router.route("/").get(getWeather);
router.route("/latlon").get(getLatLonByCityName);
router.route("/current").get(getCurrentWeather);
router.route("/forecast").get(getWeatherForecast);

export default router;
