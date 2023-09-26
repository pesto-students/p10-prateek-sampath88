import { Request, Response } from "express";
import url from "url";
import axios from "axios";

const API_URL_GEOCODE = process.env.API_URL_GEOCODE;
const API_URL_WEATHER = process.env.API_URL_WEATHER;
const API_KEY_NAME = String(process.env.API_KEY_NAME);
const API_KEY_VALUE = String(process.env.API_KEY_VALUE);

type GeoCodeResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

const getCurrentWeather = async (req: Request, res: Response) => {
  const queryParams: object = url.parse(req.url, true).query;
  //   console.log(queryParams);
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...queryParams,
  });
  //   console.log("params: ", params);
  const geoCodeUrl: string = `${API_URL_GEOCODE}?${params}`;
    console.log("geoCodeUrl: ",geoCodeUrl);
  const response = await axios.get(geoCodeUrl);
  const city: GeoCodeResponse = response.data[0];
  const { lat, lon, country, name } = city;

  const weatherParams = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    lat: lat.toString(),
    lon: lon.toString(),
  });

  const weatherUrl: string = `${API_URL_WEATHER}?${weatherParams}`;
  console.log("weatherUrl: ", weatherUrl);
  const weatherRes = await axios.get(weatherUrl);
  const weatherData = weatherRes.data;

  res.status(200).json(weatherData);
};

export { getCurrentWeather };
