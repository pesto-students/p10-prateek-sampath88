import { Request, Response } from "express";
import { WeatherQueryParams, weatherQueryParamsSchema } from "./schema";
import dayjs from "dayjs";
import {
  GeoCodeResponse,
  getCurrentWeatherByLatLon,
  getGeoCoordinatesByCity,
  getWeatherByLatLon,
  getWeatherForecastByLatLon,
  parseQueryFromUrl,
  parseWeatherQueryParams,
} from "./helpers";

//get current weather condition for any city
const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const query = parseQueryFromUrl(req.url);
    console.log(query);
    //check if city exist in query params
    let params: WeatherQueryParams = parseWeatherQueryParams(query);

    // Get Geocoordinates of a city
    const geoData: GeoCodeResponse[] = await getGeoCoordinatesByCity(
      params.city
    );
    if (!geoData.length) {
      return res.status(200).json({ success: false, message: "No data found" });
    }
    const { lat, lon }: GeoCodeResponse = geoData[0];

    // Get weather data by latitude and longitude
    const weatherData = await getCurrentWeatherByLatLon({
      lat: String(lat),
      lon: String(lon),
    });
    return res.status(200).json(weatherData);
  } catch (e: any) {
    console.error(e);
    const error = e.errors[0];
    res.status(400).json({ success: false, message: error.message });
  }
};

const getWeatherForecast = async (req: Request, res: Response) => {
  try {
    const query = parseQueryFromUrl(req.url);
    console.log(query);
    //check if city exist in query params
    let params: WeatherQueryParams = parseWeatherQueryParams(query);

    // Get Geocoordinates of a city
    const geoData: GeoCodeResponse[] = await getGeoCoordinatesByCity(
      params.city
    );
    if (!geoData.length) {
      return res.status(200).json({ success: false, message: "No data found" });
    }
    const { lat, lon }: GeoCodeResponse = geoData[0];

    // Get weather data by latitude and longitude
    const weatherData = await getWeatherForecastByLatLon({
      lat: String(lat),
      lon: String(lon),
      exclude: params.exclude,
      units: params.units,
      lang: params.lang,
      days: params.days,
    });
    return res.status(200).json(weatherData);
  } catch (e: any) {
    console.error(e.errors);
    const error = e.errors[0];
    res.status(400).json({ success: false, message: error.message });
  }
};

//get weather filters: [city, date, time]
const getWeather = async (req: Request, res: Response) => {
  try {
    const query = parseQueryFromUrl(req.url);
    console.log(query);
    //check if city exist in query params
    let params: WeatherQueryParams = parseWeatherQueryParams(query);

    // Get Geocoordinates of a city
    const geoData: GeoCodeResponse[] = await getGeoCoordinatesByCity(
      params.city
    );
    if (!geoData.length) {
      return res.status(200).json({ success: false, message: "No data found" });
    }
    const { lat, lon }: GeoCodeResponse = geoData[0];

    // Get weather data by latitude and longitude
    const weatherData = await getWeatherByLatLon({
      lat: String(lat),
      lon: String(lon),
      units: params.units,
      lang: params.lang,
      dt: params.dt ? params.dt : String(dayjs().unix()),
    });
    return res.status(200).json(weatherData);
  } catch (e: any) {
    console.error(e.errors);
    const error = e.errors[0];
    res.status(400).json({ success: false, message: error.message });
  }
};

export { getCurrentWeather, getWeatherForecast, getWeather };
