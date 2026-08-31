import weatherService from "../services/weather.services.js";

export const getWeatherByCity = async (req, res, next) => {
  try {
    const { city } = req.query;

    const weather = await weatherService.getWeatherByCity(city);

    res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    next(error);
  }
};

export const getWeatherByCoordinates = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    const weather = await weatherService.getWeatherByCoordinates(
      latitude,
      longitude
    );

    res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    next(error);
  }
};