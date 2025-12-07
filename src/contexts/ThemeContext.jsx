import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// Get initial theme before React renders to prevent flash
const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  }

  // Fall back to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const ThemeProvider = ({ children }) => {
  // Initialize with saved theme to prevent flash
  const [isDark, setIsDark] = useState(() => getInitialTheme());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme immediately on mount
  useEffect(() => {
    applyTheme(isDark);
  }, []);

  // Apply theme to document and body
  const applyTheme = (dark) => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (dark) {
      htmlElement.setAttribute("data-theme", "dark");
      htmlElement.classList.add("dark");
      bodyElement.classList.add("dark");
      bodyElement.style.backgroundColor = "#020617";
      bodyElement.style.color = "#E5E7EB";
      bodyElement.style.transition = "background-color 0.3s, color 0.3s";
    } else {
      htmlElement.setAttribute("data-theme", "light");
      htmlElement.classList.remove("dark");
      bodyElement.classList.remove("dark");
      bodyElement.style.backgroundColor = "#FFFFFF";
      bodyElement.style.color = "#1F2937";
      bodyElement.style.transition = "background-color 0.3s, color 0.3s";
    }

    // Save to localStorage
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyTheme(newDarkMode);

    // Reset transitioning state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
