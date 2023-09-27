import { string, z } from "zod";
import { Request, Response } from "express";
import url from "url";
import axios from "axios";
import { ParsedUrlQueryInput } from "querystring";

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

type latLon = {
  lat: number;
  lon: number;
};

const getGeoCoordinatesByCity = async (city: string) => {
  if (!city) return;
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    q: city,
  });
  const url: string = `${API_URL_GEOCODE}?${params}`;
  const response = await axios.get(url);
  return response.data[0];
};

const getWeatherByLatLon = async ({ lat, lon }: latLon): Promise<[]> => {
  if (!(lat && lon)) return [];
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const url: string = `${API_URL_WEATHER}?${params}`;
  console.log("weatherUrl: ", url);
  const response = await axios.get(url);
  return response.data[0];
};

interface WeatherQueryParams extends ParsedUrlQueryInput {
  city: string;
}

interface ReqQuery {
  city: string;
}

const getCurrentWeather = async (
  req: Request<{}, {}, {}, ReqQuery>,
  res: Response
) => {
  const query = url.parse(req.url, true).query;
  const city=z.string(query);
  // const queryParams = req.query;
  // console.log(queryParams);
  // return res.status(200).json({});
  // if (!queryParams.city) return;
  const cityy: GeoCodeResponse = await getGeoCoordinatesByCity(
    city?.toString()
  );
  // const { lat, lon, country, name } = city;
  // const weatherData = await getWeatherByLatLon({ lat, lon });
  // res.status(200).json(weatherData);
};

export { getCurrentWeather };
