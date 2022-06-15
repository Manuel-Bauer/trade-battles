import React, {useState, useContext, createContext} from 'react';
import {UserInitializer} from './shared/EmptyInitializers';
import {User} from './shared/Types';

type UserContextType = {
  user: User;
  handleSetUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: UserInitializer,
  handleSetUser: () => {},
});

type ThemeContextType = {
  darkmode: boolean;
  handleSetTheme: (theme: boolean) => void;
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
};

const ThemeContext = createContext<ThemeContextType>({
  darkmode: false,
  handleSetTheme: () => {},
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

export const UserProvider: React.FC<any> = ({children}) => {
  const [user, setUser] = useState<User>(UserInitializer);
  const handleSetUser = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{user, handleSetUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const ThemeProvider: React.FC<any> = ({children}) => {
  const [darkmode, setDarkmode] = useState(false);
  const handleSetTheme = (darkmode: boolean) => {
    setDarkmode(darkmode);
  };

  const theme = {
    // colors
    primary_green: '#09BE8E',
    primary_yellow: darkmode ? '#09BE8E' : '#F7E733',
    primary_red: '#FF4B4B',
    light_mode_white: darkmode ? '#121212' : 'white',
    stockCardBackground: darkmode ? '#121212' : 'white',

    colorPrimary: darkmode ? 'white' : 'black',
    greyPrimary: darkmode ? '#40404E' : '#F8F8F8',
    // fonts
    fontFamilyBold: 'PlusJakartaSans-Bold',
    fontFamilyRegular: 'PlusJakartaSans-Regular',
    fontFamilyLight: 'PlusJakartaSans-Light',
  };

  return (
    <ThemeContext.Provider value={{darkmode, handleSetTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export const useThemeContext = () => useContext(ThemeContext);
