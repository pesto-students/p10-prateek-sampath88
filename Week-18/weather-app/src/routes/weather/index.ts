import express from "express";
import { getCurrentWeather } from "./controller";

const router = express.Router();

router.route("/").get(getCurrentWeather);

export default router;
