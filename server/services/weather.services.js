const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const getWeatherByCity = async (city) => {
  if (!city) {
    const error = new Error("City is required");
    error.statusCode = 400;
    throw error;
  }

  // Find city coordinates
  const geoParams = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  });

  const geoResponse = await fetch(`${GEOCODING_API}?${geoParams}`);

  if (!geoResponse.ok) {
    const error = new Error("Failed to fetch city information");
    error.statusCode = 502;
    throw error;
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  const location = geoData.results[0];

  return getWeatherByCoordinates(
    location.latitude,
    location.longitude,
    location.name,
    location.country
  );
};

const getWeatherByCoordinates = async (
  latitude,
  longitude,
  cityName = null,
  country = null
) => {
  const weatherParams = new URLSearchParams({
    latitude,
    longitude,

    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure,visibility",

    hourly:
      "temperature_2m,precipitation_probability,weather_code,wind_speed_10m",

    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",

    timezone: "auto",

    forecast_days: "7",
  });

  const weatherResponse = await fetch(
    `${WEATHER_API}?${weatherParams}`
  );

  if (!weatherResponse.ok) {
    const error = new Error("Failed to fetch weather data");
    error.statusCode = 502;
    throw error;
  }

  const weatherData = await weatherResponse.json();

  return {
    location: {
      city: cityName,
      country,
      latitude: weatherData.latitude,
      longitude: weatherData.longitude,
      timezone: weatherData.timezone,
    },

    current: {
      temperature: weatherData.current.temperature_2m,
      feelsLike: weatherData.current.apparent_temperature,
      humidity: weatherData.current.relative_humidity_2m,
      precipitation: weatherData.current.precipitation,
      windSpeed: weatherData.current.wind_speed_10m,
      pressure: weatherData.current.surface_pressure,
      visibility: weatherData.current.visibility,
      weatherCode: weatherData.current.weather_code,
      time: weatherData.current.time,
    },

    hourly: weatherData.hourly.time.map((time, index) => ({
      time,
      temperature: weatherData.hourly.temperature_2m[index],
      precipitationProbability:
        weatherData.hourly.precipitation_probability[index],
      weatherCode: weatherData.hourly.weather_code[index],
      windSpeed: weatherData.hourly.wind_speed_10m[index],
    })),

    daily: weatherData.daily.time.map((date, index) => ({
      date,
      weatherCode: weatherData.daily.weather_code[index],
      maxTemperature:
        weatherData.daily.temperature_2m_max[index],
      minTemperature:
        weatherData.daily.temperature_2m_min[index],
      precipitationProbability:
        weatherData.daily.precipitation_probability_max[index],
      sunrise: weatherData.daily.sunrise[index],
      sunset: weatherData.daily.sunset[index],
    })),
  };
};

export default {
  getWeatherByCity,
  getWeatherByCoordinates,
};