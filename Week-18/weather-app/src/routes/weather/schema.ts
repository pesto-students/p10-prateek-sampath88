import { ParsedUrlQueryInput } from "querystring";
import { query } from "express";
import url from "url";
import { object, string, TypeOf,infer } from "zod";

export const weatherQueryParamsSchema = object({
  query: infer
});

export type WeatherQueryParams = TypeOf<
  typeof weatherQueryParamsSchema
>["query"];
