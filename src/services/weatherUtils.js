// ======================================================
// WEATHER ICON
// ======================================================

export const getWeatherIcon = (code) => {

    if (code === 0) return "☀️";

    if (code === 1) return "🌤️";

    if (code === 2) return "⛅";

    if (code === 3) return "☁️";

    if (code === 45 || code === 48) return "🌫️";

    if (code >= 51 && code <= 57) {
        return "🌦️";
    }

    if (code >= 61 && code <= 67) {
        return "🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "❄️";
    }

    if (code >= 80 && code <= 82) {
        return "🌦️";
    }

    if (code >= 85 && code <= 86) {
        return "🌨️";
    }

    if (code >= 95 && code <= 99) {
        return "⛈️";
    }

    return "🌤️";
};


// ======================================================
// DESCRIPTION
// ======================================================

export const getWeatherDescription = (code) => {

    if (code === 0) return "Clear Sky";

    if (code === 1) return "Mainly Clear";

    if (code === 2) return "Partly Cloudy";

    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers";
    }

    if (code >= 85 && code <= 86) {
        return "Snow Showers";
    }

    if (code >= 95 && code <= 99) {
        return "Thunderstorm";
    }

    return "Weather";
};


// ======================================================
// WEATHER CATEGORY
// ======================================================

export const getWeatherCategory = (code) => {

    if (code === 0) {
        return "clear";
    }

    if (code === 1) {
        return "mainly-clear";
    }

    if (code === 2) {
        return "partly-cloudy";
    }

    if (code === 3) {
        return "cloudy";
    }

    if (code === 45 || code === 48) {
        return "fog";
    }

    if (code >= 51 && code <= 57) {
        return "drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "rain";
    }

    if (code >= 71 && code <= 77) {
        return "snow";
    }

    if (code >= 80 && code <= 82) {
        return "rain";
    }

    if (code >= 85 && code <= 86) {
        return "snow-showers";
    }

    if (code >= 95 && code <= 99) {
        return "storm";
    }

    return "clear";
};


// ======================================================
// BACKGROUND CLASS
// ======================================================

export const getWeatherBackground = (code) => {

    const category =
        getWeatherCategory(code);

    return `weather-${category}`;
};