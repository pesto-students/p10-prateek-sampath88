import express from "express";
import { getCurrentWeather } from "./controller";
import validateResource from "../../middlewares/validateResource";
import { weatherQueryParamsSchema } from "./schema";

const router = express.Router();

router
  .route("/")
  .get(getCurrentWeather);

export default router;
