import { ParsedUrlQueryInput } from "querystring";
import { query } from "express";
import url from "url";
import { object, string, TypeOf, infer, number, coerce } from "zod";
const isValidNumber = coerce
  .number({
    errorMap: (issue, _) => {
      switch (issue.code) {
        case "invalid_type":
          return { message: "days must be a number and max 8" };
        case "too_small":
          return { message: "days must be greater than or equal to 1" };
        case "too_big":
          return { message: "days must be less than or equal to 8" };
        default:
          return { message: "days must be a number and max 8" };
      }
    },
  })
  .min(1)
  .max(8)
  .default(8);

export const weatherQueryParamsSchema = object({
  city: string({
    required_error: "city is required",
  }),
  exclude: string()
    .optional()
    .transform((e) => (e ? e : "")),
  units: string()
    .optional()
    .transform((e) => (e ? e : "")),
  lang: string()
    .optional()
    .transform((e) => (e ? e : "")),
  dt: string()
    .optional()
    .transform((e) => (e ? e : "")),
  days: string()
    .optional()
    .transform((e) => (e ? isValidNumber.parse(e) : 8)),
});

export type WeatherQueryParams = TypeOf<typeof weatherQueryParamsSchema>;
