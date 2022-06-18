import React, {FC, useContext, useState} from 'react';

export interface IThemeProvider {
  darkMode: boolean;
  toggleDarkMode: (theme: boolean) => void;
  theme: {
    primary_green: string;
    primary_yellow: string;
    primary_red: string;
    light_mode_white: string;
    stockCardBackground: string;
    greyPrimary: string;
    colorPrimary: string;

    fontFamilyBold: string;
    fontFamilyRegular: string;
    fontFamilyLight: string;
  };
}

const ThemeContext = React.createContext<IThemeProvider>({
  darkMode: false,
  toggleDarkMode: () => {},
  theme: {
    primary_green: '#09BE8E',
    primary_yellow: '#F7E733',
    primary_red: '#FF4B4B',
    light_mode_white: 'white',
    stockCardBackground: 'white',

    colorPrimary: 'black',
    greyPrimary: '#F8F8F8',
    fontFamilyBold: 'PlusJakartaSans-Bold',
    fontFamilyRegular: 'PlusJakartaSans-Regular',
    fontFamilyLight: 'PlusJakartaSans-Light',
  },
});

/* ----- HOOK ----- */
export function useDesign() {
  return useContext<IThemeProvider>(ThemeContext);
}

/* ----- PROVIDER ----- */
export const ThemeProvider: FC<any> = ({children}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const value = {
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
      },

      /* primary_green: '#09BE8E',
      primary_yellow: '#F7E733',
      primary_red: '#FF4B4B',
      light_mode_white: 'white',
      stockCardBackground: 'white',
      colorPrimary: 'black',
      greyPrimary: '#F8F8F8',
      fontFamilyBold: 'PlusJakartaSans-Bold',
      fontFamilyRegular: 'PlusJakartaSans-Regular',
      fontFamilyLight: 'PlusJakartaSans-Light', */
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
