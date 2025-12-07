import { useTheme } from "../contexts/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";

const ThemeToggle = () => {
    const { isDark, toggleTheme, isTransitioning } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative btn btn-circle btn-ghost overflow-hidden transition-all duration-300 hover:scale-110 ${isTransitioning ? "animate-pulse" : ""
                }`}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {/* Sun Icon */}
            <HiSun
                className={`h-6 w-6 absolute transition-all duration-500 ${isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                    }`}
            />

            {/* Moon Icon */}
            <HiMoon
                className={`h-6 w-6 absolute transition-all duration-500 ${isDark
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                    }`}
            />

            {/* Animated background circle */}
            <span
                className={`absolute inset-0 rounded-full transition-all duration-500 ${isDark
                    ? "bg-yellow-400/10 scale-100"
                    : "bg-indigo-400/10 scale-100"
                    }`}
            />
        </button>
    );
};

export default ThemeToggle;
