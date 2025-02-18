import React, { useEffect, useState } from "react";
import "../assets/css/Toggle.css"; // Add styles

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme and save preference to localStorage
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme on component mount and when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Check localStorage for saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? (
        <span role="img" aria-label="Light Mode">
          🌞
        </span> // Sun icon for light mode
      ) : (
        <span role="img" aria-label="Dark Mode">
          🌙
        </span> // Moon icon for dark mode
      )}
    </button>
  );
}

export default ThemeToggle;
