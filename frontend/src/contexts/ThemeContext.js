import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('movie-db-theme');
    return savedTheme || 'dark';
  });

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'light') {
      // Light theme colors
      root.style.setProperty('--background-color', '#ffffff');
      root.style.setProperty('--background-darker', '#f8fafc');
      root.style.setProperty('--background-waves', '#f1f5f9');
      root.style.setProperty('--input-background', '#ffffff');
      root.style.setProperty('--input-border', '#d1d5db');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--text-muted', '#9ca3af');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--card-background', '#ffffff');
      root.style.setProperty('--logo-bg', '#f3f4f6');
      root.style.setProperty('--top-line-color', '#3b82f6');
      root.style.setProperty('--secondary-color', '#64748b');
    } else {
      // Dark theme colors (current default)
      root.style.setProperty('--background-color', '#1a3a3a');
      root.style.setProperty('--background-darker', '#0f2a2a');
      root.style.setProperty('--background-waves', '#1a4a4a');
      root.style.setProperty('--input-background', '#2a4a4a');
      root.style.setProperty('--input-border', '#3a5a5a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b0b0b0');
      root.style.setProperty('--text-muted', '#888888');
      root.style.setProperty('--border-color', '#3a5a5a');
      root.style.setProperty('--card-background', '#2a4a4a');
      root.style.setProperty('--logo-bg', '#333333');
      root.style.setProperty('--top-line-color', '#00aaff');
      root.style.setProperty('--secondary-color', '#64748b');
    }
    
    // Save theme to localStorage
    localStorage.setItem('movie-db-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
