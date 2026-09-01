
import { useState } from "react";

import {
    fetchHistoricalWeather
} from "../services/weatherApi";

import {
    getWeatherIcon,
    getWeatherDescription
} from "../services/weatherUtils";


function HistoricalWeather({
    latitude,
    longitude
}) {

    const [selectedDate, setSelectedDate] =
        useState("");

    const [weather, setWeather] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // Select previous date
    // ==========================================

    const handleDateChange = async (event) => {

        const date =
            event.target.value;


        if (!date) {
            return;
        }


        setSelectedDate(date);

        setWeather(null);

        setError("");

        setLoading(true);


        try {

            const data =
                await fetchHistoricalWeather(
                    latitude,
                    longitude,
                    date
                );


            setWeather(data);

        } catch (error) {

            console.error(
                "Historical weather error:",
                error
            );

            setError(
                "Unable to load historical weather."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Maximum selectable date
    // Yesterday
    // ==========================================

    const getYesterday = () => {

        const date =
            new Date();

        date.setDate(
            date.getDate() - 1
        );

        return date
            .toISOString()
            .split("T")[0];

    };


    // ==========================================
    // Historical weather
    // ==========================================

    return (

        <section className="history-section">

            <div className="history-header">

                <div>

                    <h2>
                        📅 Historical Weather
                    </h2>

                    <p>
                        Select a previous date
                        to view the actual weather
                    </p>

                </div>

            </div>


            <div className="history-selector">

                <label htmlFor="history-date">

                    Select Date

                </label>


                <input
                    id="history-date"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={getYesterday()}
                />

            </div>


            {loading && (

                <div className="history-loading">

                    ⏳ Loading historical weather...

                </div>

            )}


            {error && (

                <div className="history-error">

                    ⚠️ {error}

                </div>

            )}


            {weather && !loading && (

                <div className="historical-weather">

                    <h3>

                        Weather on{" "}

                        {new Date(
                            `${selectedDate}T00:00:00`
                        ).toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        )}

                    </h3>


                    <div className="historical-main">

                        <div className="historical-icon">

                            {getWeatherIcon(
                                weather.weatherCode
                            )}

                        </div>


                        <div>

                            <div className="historical-temperature">

                                {Math.round(
                                    weather.temperature
                                )}

                                °C

                            </div>


                            <div className="historical-description">

                                {getWeatherDescription(
                                    weather.weatherCode
                                )}

                            </div>

                        </div>

                    </div>


                    <div className="historical-details">

                        <div>

                            <span>
                                🌡️ Maximum
                            </span>

                            <strong>

                                {Math.round(
                                    weather.maxTemperature
                                )}
                                °C

                            </strong>

                        </div>


                        <div>

                            <span>
                                ❄️ Minimum
                            </span>

                            <strong>

                                {Math.round(
                                    weather.minTemperature
                                )}
                                °C

                            </strong>

                        </div>


                        <div>

                            <span>
                                💧 Precipitation
                            </span>

                            <strong>

                                {weather.precipitation}

                                mm

                            </strong>

                        </div>


                        <div>

                            <span>
                                💨 Wind Speed
                            </span>

                            <strong>

                                {weather.windSpeed}

                                km/h

                            </strong>

                        </div>

                    </div>

                </div>

            )}

        </section>

    );

}


export default HistoricalWeather;
