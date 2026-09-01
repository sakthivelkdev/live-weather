
const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";

const ARCHIVE_API =
    "https://archive-api.open-meteo.com/v1/archive";


// ======================================================
// CURRENT + 7 DAY FORECAST
// ======================================================

export const fetchWeatherByCoords = async (
    latitude,
    longitude
) => {

    const url =
        `${WEATHER_API}?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,` +
        `rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,` +
        `wind_speed_10m_max` +
        `&timezone=auto` +
        `&forecast_days=7`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Weather API error: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================================
// HISTORICAL WEATHER
// ======================================================

export const fetchHistoricalWeather = async (
    latitude,
    longitude,
    date
) => {

    if (!date) {
        throw new Error(
            "Historical weather date is required"
        );
    }

    const url =
        `${ARCHIVE_API}?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&start_date=${date}` +
        `&end_date=${date}` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
        `precipitation_sum,rain_sum,showers_sum,snowfall_sum,` +
        `precipitation_probability_max,wind_speed_10m_max` +
        `&hourly=temperature_2m,relative_humidity_2m,` +
        `apparent_temperature,precipitation,rain,showers,` +
        `snowfall,weather_code,wind_speed_10m` +
        `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Historical weather API error: ${response.status}`
        );
    }

    return await response.json();
};


// ======================================================
// GET WEATHER FOR ONE FORECAST DAY
// ======================================================

export const getForecastDay = (
    weatherData,
    index
) => {

    if (
        !weatherData ||
        !weatherData.daily ||
        !weatherData.daily.time ||
        index < 0 ||
        index >= weatherData.daily.time.length
    ) {
        return null;
    }

    const daily = weatherData.daily;

    return {

        date:
            daily.time[index],

        weatherCode:
            daily.weather_code?.[index] ?? 0,

        maxTemperature:
            daily.temperature_2m_max?.[index] ?? null,

        minTemperature:
            daily.temperature_2m_min?.[index] ?? null,

        precipitation:
            daily.precipitation_sum?.[index] ?? 0,

        rain:
            daily.rain_sum?.[index] ?? 0,

        showers:
            daily.showers_sum?.[index] ?? 0,

        snowfall:
            daily.snowfall_sum?.[index] ?? 0,

        precipitationProbability:
            daily.precipitation_probability_max?.[index] ?? 0,

        windSpeed:
            daily.wind_speed_10m_max?.[index] ?? 0

    };
};
