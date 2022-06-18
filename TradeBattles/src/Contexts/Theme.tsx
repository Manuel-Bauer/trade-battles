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
      lightPrimary: string;
      primary: string;
      darkPrimary: string;
      lightSecondary: string;
      secondary: string;
      darkSecondary: string;
      backgroundColor: string;
    };
    fonts: {
      fontFamilyBold: string;
      fontFamilyRegular: string;
      fontFamilyLight: string;
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
        lightPrimary: darkMode ? '#FFB2FE' : '#8231fb',
        primary: darkMode ? '#EA7FFC' : '#6101EE',
        darkPrimary: darkMode ? '#B54FC8' : '#300399',
        lightSecondary: darkMode ? '#ffddfe' : '#e7d8fd',
        secondary: darkMode ? '#f4b8ff' : '#c4a0f9',
        darkSecondary: darkMode ? '#d794e2' : '#a084e1',
        backgroundColor: darkMode ? '#00243B' : '#FAFAFA',
      },
      fonts: {
        fontFamilyBold: 'PlusJakartaSans-Bold',
        fontFamilyRegular: 'PlusJakartaSans-Regular',
        fontFamilyLight: 'PlusJakartaSans-Light',
      },
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
