import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme color schemes
const themes = {
  light: {
    name: 'Light',
    primary: '#6200ea',
    secondary: '#03dac6',
    error: '#b00020',
    background: '#f5f5f5',
    surface: '#ffffff',
    textPrimary: '#333333',
    textSecondary: '#757575'
  },
  dark: {
    name: 'Dark',
    primary: '#bb86fc',
    secondary: '#03dac6',
    error: '#cf6679',
    background: '#121212',
    surface: '#1e1e1e',
    textPrimary: '#e0e0e0',
    textSecondary: '#a0a0a0'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0277bd',
    secondary: '#4fc3f7',
    error: '#e57373',
    background: '#e1f5fe',
    surface: '#ffffff',
    textPrimary: '#263238',
    textSecondary: '#546e7a'
  },
  forest: {
    name: 'Forest',
    primary: '#2e7d32',
    secondary: '#81c784',
    error: '#e57373',
    background: '#e8f5e9',
    surface: '#ffffff',
    textPrimary: '#1b5e20',
    textSecondary: '#558b2f'
  },
  sunset: {
    name: 'Sunset',
    primary: '#ff6f00',
    secondary: '#ffab40',
    error: '#e57373',
    background: '#fff8e1',
    surface: '#ffffff',
    textPrimary: '#4e342e',
    textSecondary: '#8d6e63'
  },
  midnight: {
    name: 'Midnight',
    primary: '#5e35b1',
    secondary: '#7e57c2',
    error: '#cf6679',
    background: '#0a0e21',
    surface: '#1a1f35',
    textPrimary: '#e0e0e0',
    textSecondary: '#9e9e9e'
  },
  pastel: {
    name: 'Pastel',
    primary: '#ec407a',
    secondary: '#f48fb1',
    error: '#e57373',
    background: '#f3e5f5',
    surface: '#ffffff',
    textPrimary: '#6a1b9a',
    textSecondary: '#8e24aa'
  }
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or default to light
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('tideTheme');
    return savedTheme || 'light';
  });

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.secondary);
      document.documentElement.style.setProperty('--error-color', theme.error);
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--surface-color', theme.surface);
      document.documentElement.style.setProperty('--text-primary', theme.textPrimary);
      document.documentElement.style.setProperty('--text-secondary', theme.textSecondary);
      
      // Save theme preference
      localStorage.setItem('tideTheme', currentTheme);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setCurrentTheme, 
      themes,
      themeNames: Object.keys(themes).map(key => ({
        id: key,
        name: themes[key].name
      }))
    }}>
      {children}
    </ThemeContext.Provider>
  );
};