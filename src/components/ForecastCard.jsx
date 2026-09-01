
function ForecastCard({
    date,
    maxTemperature,
    minTemperature,
    weatherCode,
    temperatureUnit,
    precipitation = 0,
    rain = 0,
    showers = 0,
    snowfall = 0,
    precipitationProbability = 0,
    windSpeed = 0,
    onSelect,
    selected = false
}) {


    // ==================================================
    // WEATHER ICON
    // ==================================================

    const getWeatherIcon = (
        code
    ) => {

        if (code === 0) {
            return "☀️";
        }

        if (
            code === 1 ||
            code === 2
        ) {
            return "🌤️";
        }

        if (code === 3) {
            return "☁️";
        }

        if (
            code === 45 ||
            code === 48
        ) {
            return "🌫️";
        }

        if (
            code >= 51 &&
            code <= 57
        ) {
            return "🌦️";
        }

        if (
            code >= 61 &&
            code <= 67
        ) {
            return "🌧️";
        }

        if (
            code >= 71 &&
            code <= 77
        ) {
            return "❄️";
        }

        if (
            code >= 80 &&
            code <= 82
        ) {
            return "🌦️";
        }

        if (
            code >= 85 &&
            code <= 86
        ) {
            return "🌨️";
        }

        if (code >= 95) {
            return "⛈️";
        }

        return "🌤️";
    };


    // ==================================================
    // WEATHER DESCRIPTION
    // ==================================================

    const getWeatherDescription = (
        code
    ) => {

        if (code === 0) {
            return "Clear Sky";
        }

        if (code === 1) {
            return "Mainly Clear";
        }

        if (code === 2) {
            return "Partly Cloudy";
        }

        if (code === 3) {
            return "Overcast";
        }

        if (
            code === 45 ||
            code === 48
        ) {
            return "Fog";
        }

        if (
            code >= 51 &&
            code <= 57
        ) {
            return "Drizzle";
        }

        if (
            code >= 61 &&
            code <= 67
        ) {
            return "Rain";
        }

        if (
            code >= 71 &&
            code <= 77
        ) {
            return "Snow";
        }

        if (
            code >= 80 &&
            code <= 82
        ) {
            return "Rain Showers";
        }

        if (
            code >= 85 &&
            code <= 86
        ) {
            return "Snow Showers";
        }

        if (code >= 95) {
            return "Thunderstorm";
        }

        return "Weather";
    };


    // ==================================================
    // SELECT DAY
    // ==================================================

    const handleClick = () => {

        if (!onSelect) {
            return;
        }


        onSelect({

            date,

            weatherCode,

            maxTemperature,

            minTemperature,

            precipitation,

            rain,

            showers,

            snowfall,

            precipitationProbability,

            windSpeed

        });

    };


    return (

        <button
            type="button"
            className={`
                forecast-card
                ${selected
                    ? "forecast-card-selected"
                    : ""}
            `}
            onClick={handleClick}
        >

            {/* ==========================================
                DAY
            ========================================== */}

            <div className="forecast-day">

                <strong>

                    {new Date(
                        `${date}T12:00:00`
                    ).toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short"
                        }
                    )}

                </strong>


                <span>

                    {new Date(
                        `${date}T12:00:00`
                    ).toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric"
                        }
                    )}

                </span>

            </div>


            {/* ==========================================
                ICON
            ========================================== */}

            <div className="forecast-weather-icon">

                {getWeatherIcon(
                    weatherCode
                )}

            </div>


            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <div className="forecast-description">

                {getWeatherDescription(
                    weatherCode
                )}

            </div>


            {/* ==========================================
                TEMPERATURE
            ========================================== */}

            <div className="forecast-temperatures">

                <div>

                    <span>
                        High
                    </span>

                    <strong>

                        {maxTemperature !==
                        null &&
                        maxTemperature !==
                        undefined
                            ? Math.round(
                                maxTemperature
                            )
                            : "--"}

                        {temperatureUnit}

                    </strong>

                </div>


                <div>

                    <span>
                        Low
                    </span>

                    <strong>

                        {minTemperature !==
                        null &&
                        minTemperature !==
                        undefined
                            ? Math.round(
                                minTemperature
                            )
                            : "--"}

                        {temperatureUnit}

                    </strong>

                </div>

            </div>


            {/* ==========================================
                CLICK TEXT
            ========================================== */}

            <div className="forecast-click">

                {selected
                    ? "✓ Selected"
                    : "Click for details"}

            </div>

        </button>

    );

}


export default ForecastCard;
