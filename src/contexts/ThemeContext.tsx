import React, { useEffect, useState, createContext, useContext } from 'react';
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {}
});
export const ThemeProvider = ({
  children
}) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('darkMode', (!isDark).toString());
    document.documentElement.classList.toggle('dark');
  };
  return <ThemeContext.Provider value={{
    isDark,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);