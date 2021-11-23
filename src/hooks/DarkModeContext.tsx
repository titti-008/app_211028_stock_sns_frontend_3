import { useContext, createContext, useState, FC } from 'react';

import { createTheme } from '@mui/material/styles';

type ContextType = {
  darkMode: boolean;
  handleDarkModeOn: () => void;
  handleDarkModeOff: () => void;
};

const DarkModeContext = createContext({} as ContextType);

export const useDarkModeContext = () => useContext(DarkModeContext);

export const DarkModeProvider: FC = ({ children }) => {
  // ----------ダークモードの状態管理----------------------
  const [darkMode, setDarkMode] = useState(
    !!(localStorage.getItem('darkMode') === 'on'),
  );

  const chengeTheme = () => {
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    });
  };

  const handleDarkModeOn = () => {
    console.log('onぬ');
    localStorage.setItem('darkMode', 'on');
    setDarkMode(true);
    chengeTheme();
  };

  const handleDarkModeOff = () => {
    console.log('offぬ');
    localStorage.setItem('darkMode', 'off');
    setDarkMode(false);
    chengeTheme();
  };

  const value = {
    darkMode,
    handleDarkModeOn,
    handleDarkModeOff,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
