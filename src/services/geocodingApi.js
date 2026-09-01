
const BASE_URL =
    "https://geocoding-api.open-meteo.com/v1/search";


// ==========================================
// Search Cities
// ==========================================

export const searchCities = async (cityName) => {

    if (!cityName || !cityName.trim()) {
        return [];
    }

    const url =
        `${BASE_URL}?` +
        `name=${encodeURIComponent(cityName.trim())}` +
        `&count=10` +
        `&language=en` +
        `&format=json`;

    const response = await fetch(url);

    if (!response.ok) {

        throw new Error(
            `Geocoding API failed: ${response.status}`
        );

    }

    const data = await response.json();

    if (!data.results) {
        return [];
    }

    return data.results.map((location) => ({

        id: location.id,

        name: location.name,

        latitude: location.latitude,

        longitude: location.longitude,

        country: location.country || "",

        countryCode: location.country_code || "",

        state: location.admin1 || "",

        timezone: location.timezone || "",

        population: location.population || 0

    }));

};


// ==========================================
// Get Best Matching City
// ==========================================

export const searchCity = async (cityName) => {

    const cities =
        await searchCities(cityName);

    if (cities.length === 0) {

        throw new Error(
            "City not found"
        );

    }

    // Prefer exact city name
    const exactMatch =
        cities.find(
            (city) =>
                city.name.toLowerCase() ===
                cityName.trim().toLowerCase()
        );

    return exactMatch || cities[0];

};
