import { Router } from "express";
import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from "../controllers/weather.contoller.js";

const WeatherRouter = Router();

WeatherRouter.get("/", getWeatherByCity);

WeatherRouter.get("/coordinates", getWeatherByCoordinates);

export default WeatherRouter;