import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(isDarkMode);
    applyTheme(isDarkMode);
  }, []);

  // Apply theme to document and body
  const applyTheme = (dark) => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (dark) {
      htmlElement.setAttribute("data-theme", "dark");
      bodyElement.classList.add("dark");
      bodyElement.style.backgroundColor = "#020617";
      bodyElement.style.color = "#E5E7EB";
      bodyElement.style.transition = "background-color 0.3s, color 0.3s";
    } else {
      htmlElement.setAttribute("data-theme", "light");
      bodyElement.classList.remove("dark");
      bodyElement.style.backgroundColor = "#FFFFFF";
      bodyElement.style.color = "#1F2937";
      bodyElement.style.transition = "background-color 0.3s, color 0.3s";
    }

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
