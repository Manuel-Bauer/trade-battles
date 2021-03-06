import React, {FC, useContext, useState} from 'react';

export interface IThemeProvider {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: {
    colors: {
      darkest: string;
      darker: string;
      dark: string;
      light: string;
      lighter: string;
      lightest: string;
      white: string;
      lightRed: string;
      red: string;
      darkRed: string;
      lightGreen: string;
      green: string;
      darkGreen: string;
      lightYellow: string;
      yellow: string;
      darkYellow: string;
      lightPrimary: string;
      primary: string;
      darkPrimary: string;
      lightSecondary: string;
      secondary: string;
      darkSecondary: string;
      backgroundColor: string;
      textPrimary: string;
      textSecondary: string;
    };
    fonts: {
      bold: string;
      regular: string;
      light: string;
    };
  };
}

const ThemeContext = React.createContext<IThemeProvider | null>(null);

/* ----- HOOK ----- */
export function useTheme() {
  return useContext<IThemeProvider | null>(ThemeContext);
}

/* ----- PROVIDER ----- */
export const ThemeProvider: FC<any> = ({children}) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const value: IThemeProvider = {
    darkMode,
    toggleDarkMode: () => setDarkMode(!darkMode),
    theme: {
      colors: {
        darkest: '#000000',
        darker: '#1A202C',
        dark: '#2D3748',
        light: '#A0AEC0',
        lighter: '#E2E8F0',
        lightest: '#F7FAFC',
        white: '#ffffff',
        lightRed: '#FEB2B2',
        red: '#E53E3E',
        darkRed: '#9B2C2C',
        lightGreen: '#C6F6D5',
        green: '#48BB78',
        darkGreen: '#1C4532',
        lightYellow: '#f6f6c6',
        yellow: '#ffff00',
        darkYellow: '#eed219',
        lightPrimary: darkMode ? '#a6acff' : '#8231fb',
        primary: darkMode ? '#647bfb' : '#6101EE',
        darkPrimary: darkMode ? '#2b3898' : '#300399',
        lightSecondary: darkMode ? '#e7e8ff' : '#e7d8fd',
        secondary: darkMode ? '#c3c9fd' : '#c4a0f9',
        darkSecondary: darkMode ? '#a6a7ff' : '#a084e1',
        backgroundColor: darkMode ? '#141414' : '#FAFAFA',
        textPrimary: darkMode ? '#FAFAFA' : '#171717',
        textSecondary: darkMode ? '#d5d5d5' : '#383838',
      },
      fonts: {
        bold: 'PlusJakartaSans-Bold',
        regular: 'PlusJakartaSans-Regular',
        light: 'PlusJakartaSans-Light',
      },
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
