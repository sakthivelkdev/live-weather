import { useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import HistoricalWeather from "./components/HistoricalWeather";
import Loading from "./components/Loading";
import WeatherBackground from "./components/WeatherBackground";

import {
    fetchWeatherByCoords,
    fetchHistoricalWeather
} from "./services/weatherApi";

import { searchCity } from "./services/geocodingApi";

import {
    getWeatherDescription,
    getWeatherIcon
} from "./services/weatherUtils";

function App() {

    const [location, setLocation] =
        useState(null);

    const [weatherData, setWeatherData] =
        useState(null);

    const [historicalData, setHistoricalData] =
        useState(null);

    const [historyDate, setHistoryDate] =
        useState("");

    const [selectedDay, setSelectedDay] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [historyLoading, setHistoryLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [errorTitle, setErrorTitle] =
        useState("Something went wrong");

    const [darkMode, setDarkMode] =
        useState(false);


    // ==================================================
    // ERROR
    // ==================================================

    const showError = (
        message,
        title = "Something went wrong"
    ) => {
        setErrorTitle(title);
        setError(message);
    };

    const closeError = () => {
        setError("");
    };


    // ==================================================
    // LOAD WEATHER
    // ==================================================

    const loadWeather = async (
        city
    ) => {

        try {

            setLoading(true);
            setError("");

            setHistoricalData(null);
            setHistoryDate("");
            setSelectedDay(null);

            const result =
                await searchCity(city);

            setLocation(result);

            const weather =
                await fetchWeatherByCoords(
                    result.latitude,
                    result.longitude
                );

            setWeatherData(weather);

        } catch (err) {

            console.error(
                "Weather loading error:",
                err
            );

            showError(
                err.message ||
                "Unable to load weather data.",
                "Weather Error"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==================================================
    // SEARCH
    // ==================================================

    const handleSearch = (
        cityName
    ) => {

        if (!cityName || !cityName.trim()) {
            return;
        }

        loadWeather(
            cityName.trim()
        );
    };


    // ==================================================
    // LOCATION
    // ==================================================

    const handleLocation = () => {

        if (!navigator.geolocation) {

            showError(
                "Geolocation is not supported by your browser.",
                "Location Error"
            );

            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                try {

                    const {
                        latitude,
                        longitude
                    } = position.coords;

                    const weather =
                        await fetchWeatherByCoords(
                            latitude,
                            longitude
                        );

                    setWeatherData(weather);

                    /*
                     * Reverse geocoding is not required
                     * for weather functionality.
                     */
                    setLocation({
                        name: "Current Location",
                        latitude,
                        longitude,
                        country: "",
                        state: ""
                    });

                    setHistoricalData(null);
                    setHistoryDate("");
                    setSelectedDay(null);

                } catch (err) {

                    console.error(err);

                    showError(
                        "Unable to load weather for your current location.",
                        "Location Error"
                    );

                } finally {

                    setLoading(false);

                }
            },

            (err) => {

                console.error(err);

                setLoading(false);

                showError(
                    "Please allow location access in your browser and try again.",
                    "Location Permission"
                );
            }
        );
    };


    // ==================================================
    // FORECAST SELECT
    // ==================================================

    const handleWeatherSelect = (
        day
    ) => {

        setSelectedDay(day);

        /*
         * Selecting forecast removes
         * historical weather.
         */
        setHistoricalData(null);
        setHistoryDate("");
    };


    // ==================================================
    // HISTORICAL DATE
    // ==================================================

    const handleHistorySelect = async (
        date
    ) => {

        if (!date || !location) {
            return;
        }

        setHistoryDate(date);
        setHistoryLoading(true);
        setError("");

        try {

            const result =
                await fetchHistoricalWeather(
                    location.latitude,
                    location.longitude,
                    date
                );

            setHistoricalData(result);

            /*
             * Historical selection becomes
             * the active weather.
             */
            setSelectedDay(null);

        } catch (err) {

            console.error(
                "Historical weather error:",
                err
            );

            showError(
                err.message ||
                "Unable to load historical weather.",
                "Historical Weather Error"
            );

            setHistoricalData(null);

        } finally {

            setHistoryLoading(false);

        }
    };


    // ==================================================
    // RESET
    // ==================================================

    const resetLocation = () => {

        setLocation(null);
        setWeatherData(null);
        setHistoricalData(null);
        setHistoryDate("");
        setSelectedDay(null);
        setError("");
    };


    // ==================================================
    // CURRENT WEATHER
    // ==================================================

    const currentWeather =
        useMemo(() => {

            if (
                !weatherData ||
                !weatherData.current
            ) {
                return null;
            }

            return {
                type: "current",

                date:
                    weatherData.current.time,

                weatherCode:
                    weatherData.current.weather_code,

                temperature:
                    weatherData.current.temperature_2m,

                humidity:
                    weatherData.current.relative_humidity_2m,

                apparentTemperature:
                    weatherData.current.apparent_temperature,

                windSpeed:
                    weatherData.current.wind_speed_10m,

                precipitation:
                    weatherData.current.precipitation,

                rain:
                    null,

                maxTemperature:
                    null,

                minTemperature:
                    null,

                precipitationProbability:
                    null
            };

        }, [weatherData]);


    // ==================================================
    // SELECTED FORECAST WEATHER
    // ==================================================

    const selectedForecastWeather =
        useMemo(() => {

            if (!selectedDay) {
                return null;
            }

            return {
                type: "forecast",

                date:
                    selectedDay.date,

                weatherCode:
                    selectedDay.weatherCode,

                temperature:
                    selectedDay.maxTemperature,

                humidity:
                    null,

                apparentTemperature:
                    null,

                windSpeed:
                    selectedDay.windSpeed,

                precipitation:
                    selectedDay.precipitation,

                rain:
                    selectedDay.rain,

                maxTemperature:
                    selectedDay.maxTemperature,

                minTemperature:
                    selectedDay.minTemperature,

                precipitationProbability:
                    selectedDay.precipitationProbability
            };

        }, [selectedDay]);


    // ==================================================
    // HISTORICAL WEATHER
    // ==================================================

    const selectedHistoricalWeather =
        useMemo(() => {

            if (
                !historicalData ||
                !historyDate
            ) {
                return null;
            }

            const daily =
                historicalData.daily;

            if (
                !daily ||
                !daily.time ||
                daily.time.length === 0
            ) {
                return null;
            }

            return {
                type: "historical",

                date:
                    historyDate,

                weatherCode:
                    daily.weather_code?.[0] ?? 0,

                temperature:
                    daily.temperature_2m_max?.[0] ?? null,

                humidity:
                    null,

                apparentTemperature:
                    null,

                windSpeed:
                    daily.wind_speed_10m_max?.[0] ?? 0,

                precipitation:
                    daily.precipitation_sum?.[0] ?? 0,

                rain:
                    daily.rain_sum?.[0] ?? 0,

                maxTemperature:
                    daily.temperature_2m_max?.[0] ?? null,

                minTemperature:
                    daily.temperature_2m_min?.[0] ?? null,

                precipitationProbability:
                    daily.precipitation_probability_max?.[0] ?? 0
            };

        }, [
            historicalData,
            historyDate
        ]);


    // ==================================================
    // ACTIVE WEATHER
    // ==================================================

    const activeWeather =
        selectedHistoricalWeather ||
        selectedForecastWeather ||
        currentWeather;


    // ==================================================
    // RENDER
    // ==================================================

    return (
        <div
            className={`
                app
                ${darkMode ? "dark-mode" : ""}
            `}
        >

            <WeatherBackground
                weatherCode={
                    activeWeather?.weatherCode
                }
                darkMode={
                    darkMode
                }
            />


            <div className="app-content">

                <Header
                    darkMode={
                        darkMode
                    }

                    onToggleDarkMode={() =>
                        setDarkMode(
                            previous =>
                                !previous
                        )
                    }
                />


                {/* =====================================
                    NO LOCATION
                ===================================== */}

                {!location &&
                    !loading && (

                    <main className="location-selection">

                        <div className="location-selection-card">

                            <div className="selection-icon">
                                🌤️
                            </div>

                            <h1>
                                Select a location
                            </h1>

                            <p>
                                Search for a city or use your current location to view the weather.
                            </p>

                            <div className="selection-search">

                                <SearchBar
                                    onSearch={
                                        handleSearch
                                    }

                                    onLocation={
                                        handleLocation
                                    }
                                />

                            </div>

                        </div>

                    </main>
                )}


                {/* =====================================
                    INITIAL LOADING
                ===================================== */}

                {!location &&
                    loading && (
                    <Loading />
                )}


                {/* =====================================
                    WEATHER DASHBOARD
                ===================================== */}

                {location && (

                    <main className="weather-dashboard">

                        {/* LOCATION */}

                        <section className="location-header">

                            <div>

                                <div className="location-title">

                                    <span>
                                        📍
                                    </span>

                                    <h1>
                                        {location.name}
                                    </h1>

                                </div>

                                {(location.state ||
                                    location.country) && (

                                    <p>
                                        {location.state
                                            ? `${location.state}, `
                                            : ""}

                                        {location.country}
                                    </p>

                                )}

                            </div>


                            <button
                                type="button"
                                className="change-location-button"
                                onClick={
                                    resetLocation
                                }
                            >
                                🔍 Change Location
                            </button>

                        </section>


                        {/* CURRENT / SELECTED WEATHER */}

                        {!loading &&
                            activeWeather && (

                            <CurrentWeather
                                weather={
                                    activeWeather
                                }

                                units={
                                    activeWeather.type ===
                                    "current"
                                        ? weatherData?.current_units
                                        : weatherData?.daily_units
                                }

                                selected={
                                    activeWeather.type !==
                                    "current"
                                }

                                description={
                                    getWeatherDescription(
                                        activeWeather.weatherCode
                                    )
                                }

                                icon={
                                    getWeatherIcon(
                                        activeWeather.weatherCode
                                    )
                                }
                            />

                        )}


                        {/* DATE */}

                        {!loading && (

                            <section className="history-calendar-section">

                                <div className="section-heading">

                                    <div>

                                        <h2>
                                            📅 Select Date
                                        </h2>

                                        <p>
                                            Choose a previous date to view historical weather.
                                        </p>

                                    </div>

                                </div>


                                <div className="history-calendar">

                                    <input
                                        type="date"
                                        value={
                                            historyDate
                                        }
                                        max={
                                            weatherData?.daily?.time?.[0] ||
                                            ""
                                        }
                                        onChange={
                                            event =>
                                                handleHistorySelect(
                                                    event.target.value
                                                )
                                        }
                                    />

                                </div>

                            </section>

                        )}


                        {/* HISTORY LOADING */}

                        {historyLoading && (
                            <Loading />
                        )}


                        {/* HISTORICAL DATA */}

                        {!historyLoading &&
                            historicalData && (

                            <HistoricalWeather
                                data={
                                    historicalData
                                }

                                date={
                                    historyDate
                                }
                            />

                        )}


                        {/* FORECAST */}

                        {!loading &&
                            weatherData?.daily && (

                            <Forecast
                                daily={
                                    weatherData.daily
                                }

                                units={
                                    weatherData.daily_units
                                }

                                onWeatherSelect={
                                    handleWeatherSelect
                                }

                                selectedWeather={
                                    selectedDay
                                }
                            />

                        )}

                    </main>

                )}


                {/* ERROR */}

                {error && (

                    <div className="error-overlay">

                        <div className="error-popup">

                            <div className="error-popup-icon">
                                ⚠️
                            </div>

                            <h2>
                                {errorTitle}
                            </h2>

                            <p>
                                {error}
                            </p>

                            <button
                                type="button"
                                className="retry-button"
                                onClick={
                                    closeError
                                }
                            >
                                ✕ Close
                            </button>

                        </div>

                    </div>

                )}

            </div>
        </div>
    );
}

export default App;