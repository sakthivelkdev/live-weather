import { useEffect, useState } from "react";
import { searchCities } from "../services/geocodingApi";

function SearchBar({ onSearch, onLocation }) {
    const [searchText, setSearchText] = useState("");
    const [cities, setCities] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const value = searchText.trim();

        if (!value) {
            setCities([]);
            setSearching(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setSearching(true);

                const results = await searchCities(value);

                const search = value.toLowerCase();

                const sortedResults = [...results].sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();

                    if (nameA === search && nameB !== search) {
                        return -1;
                    }

                    if (nameB === search && nameA !== search) {
                        return 1;
                    }

                    const startsA = nameA.startsWith(search);
                    const startsB = nameB.startsWith(search);

                    if (startsA && !startsB) {
                        return -1;
                    }

                    if (startsB && !startsA) {
                        return 1;
                    }

                    return nameA.localeCompare(nameB);
                });

                setCities(sortedResults.slice(0, 10));
            } catch (error) {
                console.error("City search error:", error);
                setCities([]);
            } finally {
                setSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const value = searchText.trim();

        if (!value) {
            return;
        }

        setCities([]);

        /*
         * IMPORTANT:
         * Always search the typed city when Enter is pressed.
         * This fixes the problem where Enter did nothing.
         */
        try {
            setSearching(true);

            const results = await searchCities(value);

            if (results.length > 0) {
                onSearch(results[0].name);
            } else {
                onSearch(value);
            }
        } catch (error) {
            console.error("Search submit error:", error);

            // Still send the typed value to App
            onSearch(value);
        } finally {
            setSearching(false);
        }
    };

    const handleCityClick = (city) => {
        setSearchText(city.name);
        setCities([]);

        onSearch(city.name);
    };

    const clearSearch = () => {
        setSearchText("");
        setCities([]);
    };

    return (
        <div className="search-container">
            <form
                className="search-form"
                onSubmit={handleSubmit}
            >
                <div className="search-input-wrapper">
                    <span className="search-icon">
                        🔍
                    </span>

                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                        placeholder="Type a city name..."
                        autoComplete="off"
                        aria-label="Search city"
                    />

                    {searchText && !searching && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={clearSearch}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}

                    {searching && (
                        <span className="search-loading">
                            ⏳
                        </span>
                    )}

                    {cities.length > 0 && (
                        <div className="city-suggestions">
                            <div className="suggestions-header">
                                <span>Cities</span>
                                <span>{cities.length}</span>
                            </div>

                            <div className="suggestions-list">
                                {cities.map((city, index) => (
                                    <button
                                        type="button"
                                        className="city-suggestion"
                                        key={`${city.name}-${city.country}-${index}`}
                                        onClick={() =>
                                            handleCityClick(city)
                                        }
                                    >
                                        <span className="city-icon">
                                            📍
                                        </span>

                                        <span className="city-information">
                                            <strong>
                                                {city.name}
                                            </strong>

                                            <small>
                                                {city.state
                                                    ? `${city.state}, `
                                                    : ""}
                                                {city.country}
                                            </small>
                                        </span>

                                        <span className="city-arrow">
                                            →
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="search-button"
                >
                    🔍 Search
                </button>

                <button
                    type="button"
                    className="location-button"
                    onClick={onLocation}
                >
                    📍 My Location
                </button>
            </form>
        </div>
    );
}

export default SearchBar;