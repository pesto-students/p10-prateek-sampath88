import url from "url";
import axios from "axios";
import { WeatherQueryParams, weatherQueryParamsSchema } from "./schema";
import dayjs from "dayjs";
import { ParsedUrlQuery } from "querystring";

const API_URL_GEOCODE = process.env.API_URL_GEOCODE;
const API_URL_WEATHER = process.env.API_URL_WEATHER;
const API_URL_ONECALL = process.env.API_URL_ONECALL;
const API_KEY_NAME = String(process.env.API_KEY_NAME);
const API_KEY_VALUE = String(process.env.API_KEY_VALUE);

export type GeoCodeResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

export interface LatLon {
  lat: string;
  lon: string;
}

export interface ForecastWeatherType extends LatLon {
  exclude: string;
  units: string;
  lang: string;
  days: number;
  dt: string;
}

export interface WeatherType extends LatLon {
  units: string;
  lang: string;
  dt: string;
}

const parseQueryFromUrl = (reqURL: string) => url.parse(reqURL, true).query;

const parseWeatherQueryParams = (query: ParsedUrlQuery): WeatherQueryParams =>
  weatherQueryParamsSchema.parse({
    city: query.city,
    exclude: query.exclude,
    units: query.units,
    lang: query.lang,
    dt: query.dt,
    days: query.days,
  });

const getGeoCoordinatesByCity = async (city: string) => {
  if (!city) return [];
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    q: city,
    limit: "1",
  });
  const url: string = `${API_URL_GEOCODE}?${params}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("geo: ", error);
    return [];
  }
};

//get current weather
const getCurrentWeatherByLatLon = async ({ lat, lon }: LatLon) => {
  if (!(lat && lon)) return [];
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const url: string = `${API_URL_WEATHER}/weather?${params}`;
  console.log("weatherUrl: ", url);
  const response = await axios.get(url);
  if (response.status == 200) {
    return response.data;
  }
};

//get weather forecast [city,days,lang,units]:filters
const getWeatherForecastByLatLon = async (data: ForecastWeatherType) => {
  const { lat, lon, units, lang, days, dt } = data;
  const params = new URLSearchParams({
    lat,
    lon,
    [API_KEY_NAME]: API_KEY_VALUE,
    cnt: String(days),
    units,
    lang,
    dt,
  });
  const url: string = `${API_URL_WEATHER}/forecast?${params}`;
  console.log("weatherUrl: ", url);
  console.log("days: ", days);
  const response = await axios.get(url);
  if (response.status == 200) {
    return response.data;
  }
};

//get weather for perticular moment
const getWeatherByLatLon = async (data: WeatherType) => {
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...data,
  });
  const url: string = `${API_URL_ONECALL}/timemachine?${params}`;
  console.log("weatherUrl: ", url);
  const response = await axios.get(url);
  if (response.status == 200) {
    return response.data;
  }
};

const getWeatherByCity = async (data: {
  city: string;
  units: string;
  lang: string;
  dt: string;
}) => {
  // Get Geocoordinates of a city
  const geoData: GeoCodeResponse[] = await getGeoCoordinatesByCity(data.city);
  if (!geoData.length) {
    return { city: data.city, message: "No data found" };
  }
  const { lat, lon }: GeoCodeResponse = geoData[0];

  // Get weather data by latitude and longitude
  const weatherData = await getWeatherByLatLon({
    lat: String(lat),
    lon: String(lon),
    units: data.units,
    lang: data.lang,
    dt: data.dt ? data.dt : String(dayjs().unix()),
  });
  return { city: data.city, ...weatherData };
};

const getWeatherForMultipleCities = async (
  cities: string[],
  options: { units: string; lang: string; dt: string }
) => {
  const promises = cities.map((city: string) => {
    return getWeatherByCity({ city, ...options });
  });
  const response = await Promise.allSettled(promises);
  return response.map((res) =>
    res.status === "fulfilled" ? res.value : res.reason
  );
};

export {
  getGeoCoordinatesByCity,
  getWeatherByLatLon,
  getWeatherForecastByLatLon,
  getCurrentWeatherByLatLon,
  parseWeatherQueryParams,
  parseQueryFromUrl,
  getWeatherForMultipleCities,
};
