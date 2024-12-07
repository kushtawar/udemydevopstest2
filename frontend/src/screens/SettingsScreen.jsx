import React, { useState, useEffect } from 'react';

const SettingsScreen = ({
  theme: initialTheme = 'light',
  onThemeChange = () => {},
}) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const handleThemeChange = (selectedTheme) => {
    let themeValue = selectedTheme;
    // Map selectedTheme to the appropriate theme string used in ProfileScreen
    if (selectedTheme === 'dark') {
      themeValue = 'dark-theme';
    } else if (selectedTheme === 'green') {
      themeValue = 'green-theme';
    }
    setTheme(themeValue);
    onThemeChange(themeValue);
  };

  return (
    <div className="py-3">
      <label>
        Select Theme:
        <select
          value={
            theme === 'dark-theme'
              ? 'dark'
              : theme === 'green-theme'
              ? 'green'
              : 'light'
          }
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
          {/* Add more theme options if needed */}
        </select>
      </label>
    </div>
  );
};

export default SettingsScreen;
