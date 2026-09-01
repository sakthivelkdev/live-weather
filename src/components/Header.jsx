function Header({
    darkMode,
    onToggleDarkMode
}) {
    return (
        <header className="header">
            <div className="header-inner">

                <div className="header-brand">
                    <div className="header-icon">
                        🌤️
                    </div>

                    <div>
                        <h1>
                            Weather Dashboard
                        </h1>

                        <p>
                            Real-time weather & historical data
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="dark-mode-button"
                    onClick={onToggleDarkMode}
                    aria-pressed={darkMode}
                >
                    {darkMode
                        ? "☀️ Light"
                        : "🌙 Dark"}
                </button>

            </div>
        </header>
    );
}

export default Header;