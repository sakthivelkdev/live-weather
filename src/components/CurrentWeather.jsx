
function CurrentWeather({
    weather,
    units = {},
    selected = false,
    description,
    icon
}) {

    if (!weather) {
        return null;
    }


    const temperatureUnit =
        units.temperature_2m ||
        units.temperature_2m_max ||
        "°C";


    const windUnit =
        units.wind_speed_10m ||
        "km/h";


    const precipitationUnit =
        units.precipitation ||
        "mm";


    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const parsedDate =
            new Date(date);

        if (Number.isNaN(
            parsedDate.getTime()
        )) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
    };


    const isCurrent =
        weather.type === "current";


    return (

        <section className="current-weather-section">

            {/* ==========================================
                TITLE
            ========================================== */}

           <div className="current-weather-heading">
    <div className="weather-heading-box">
        <span className="weather-status-label">
            {isCurrent
                ? "CURRENT WEATHER"
                : weather.type === "historical"
                ? "HISTORICAL WEATHER"
                : "SELECTED DAY"}
        </span>

        <h2>
            {formatDate(weather.date)}
        </h2>
             </div>
     </div>

            {/* ==========================================
                MAIN WEATHER CARD
            ========================================== */}

            <div className="current-weather-card">

                <div className="main-weather">

                    <div className="main-weather-icon">

                        {icon || "🌤️"}

                    </div>


                    <div className="main-temperature">

                        <strong>

                            {weather.temperature !== null &&
                            weather.temperature !== undefined
                                ? Math.round(
                                    weather.temperature
                                )
                                : "--"}

                            {temperatureUnit}

                        </strong>


                        <span>
                            {description ||
                                "Weather"}
                        </span>

                    </div>

                </div>


                {/* ======================================
                    WEATHER DETAILS
                ====================================== */}

                <div className="weather-details-grid">

                    {/* Humidity */}

                    {isCurrent &&
                        weather.humidity !== null &&
                        weather.humidity !== undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                💧
                            </span>

                            <div>

                                <small>
                                    Humidity
                                </small>

                                <strong>
                                    {Math.round(
                                        weather.humidity
                                    )}%
                                </strong>

                            </div>

                        </div>

                    )}


                    {/* Wind */}

                    <div className="weather-detail">

                        <span className="detail-icon">
                            💨
                        </span>

                        <div>

                            <small>
                                Wind
                            </small>

                            <strong>

                                {weather.windSpeed !== null &&
                                weather.windSpeed !== undefined
                                    ? Math.round(
                                        weather.windSpeed
                                    )
                                    : "--"}

                                {" "}

                                {windUnit}

                            </strong>

                        </div>

                    </div>


                    {/* High */}

                    {weather.maxTemperature !==
                        null &&
                        weather.maxTemperature !==
                        undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                🔥
                            </span>

                            <div>

                                <small>
                                    High
                                </small>

                                <strong>

                                    {Math.round(
                                        weather.maxTemperature
                                    )}

                                    {temperatureUnit}

                                </strong>

                            </div>

                        </div>

                    )}


                    {/* Low */}

                    {weather.minTemperature !==
                        null &&
                        weather.minTemperature !==
                        undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                ❄️
                            </span>

                            <div>

                                <small>
                                    Low
                                </small>

                                <strong>

                                    {Math.round(
                                        weather.minTemperature
                                    )}

                                    {temperatureUnit}

                                </strong>

                            </div>

                        </div>

                    )}


                    {/* Rain */}

                    {weather.rain !==
                        null &&
                        weather.rain !==
                        undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                🌧️
                            </span>

                            <div>

                                <small>
                                    Rain
                                </small>

                                <strong>

                                    {Number(
                                        weather.rain
                                    ).toFixed(1)}

                                    {" "}

                                    {precipitationUnit}

                                </strong>

                            </div>

                        </div>

                    )}


                    {/* Precipitation */}

                    {weather.precipitation !==
                        null &&
                        weather.precipitation !==
                        undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                💦
                            </span>

                            <div>

                                <small>
                                    Precipitation
                                </small>

                                <strong>

                                    {Number(
                                        weather.precipitation
                                    ).toFixed(1)}

                                    {" "}

                                    {precipitationUnit}

                                </strong>

                            </div>

                        </div>

                    )}


                    {/* Probability */}

                    {weather.precipitationProbability !==
                        null &&
                        weather.precipitationProbability !==
                        undefined && (

                        <div className="weather-detail">

                            <span className="detail-icon">
                                ☔
                            </span>

                            <div>

                                <small>
                                    Rain Chance
                                </small>

                                <strong>

                                    {Math.round(
                                        weather.precipitationProbability
                                    )}%

                                </strong>

                            </div>

                        </div>

                    )}

                </div>


                {/* ======================================
                    APPARENT TEMPERATURE
                ====================================== */}

                {isCurrent &&
                    weather.apparentTemperature !==
                    null &&
                    weather.apparentTemperature !==
                    undefined && (

                    <div className="feels-like">

                        Feels like{" "}

                        <strong>

                            {Math.round(
                                weather.apparentTemperature
                            )}

                            {temperatureUnit}

                        </strong>

                    </div>

                )}

            </div>

        </section>

    );

}


export default CurrentWeather;
