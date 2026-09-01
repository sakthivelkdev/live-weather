
import ForecastCard from "./ForecastCard";


function Forecast({
    daily,
    units,
    onWeatherSelect,
    selectedWeather
}) {

    if (
        !daily ||
        !daily.time ||
        daily.time.length === 0
    ) {

        return null;

    }


    const temperatureUnit =
        units?.temperature_2m_max ||
        "°C";


    return (

        <section className="forecast-section">

            <div className="forecast-header">

                <div>

                    <h2>
                        7-Day Forecast
                    </h2>

                    <p>
                        Click a day to view details
                    </p>

                </div>


                <div className="forecast-icon">
                    📅
                </div>

            </div>


            <div className="forecast-grid">

                {daily.time.map(
                    (date, index) => (

                    <ForecastCard

                        key={date}

                        date={date}

                        maxTemperature={
                            daily.temperature_2m_max?.[index]
                        }

                        minTemperature={
                            daily.temperature_2m_min?.[index]
                        }

                        weatherCode={
                            daily.weather_code?.[index]
                        }

                        precipitation={
                            daily.precipitation_sum?.[index] ??
                            0
                        }

                        rain={
                            daily.rain_sum?.[index] ??
                            0
                        }

                        showers={
                            daily.showers_sum?.[index] ??
                            0
                        }

                        snowfall={
                            daily.snowfall_sum?.[index] ??
                            0
                        }

                        precipitationProbability={
                            daily.precipitation_probability_max?.[index] ??
                            0
                        }

                        windSpeed={
                            daily.wind_speed_10m_max?.[index] ??
                            0
                        }

                        temperatureUnit={
                            temperatureUnit
                        }

                        onSelect={
                            onWeatherSelect
                        }

                        selected={
                            selectedWeather?.date ===
                            date
                        }

                    />

                ))}

            </div>

        </section>

    );

}


export default Forecast;
