import React from 'react';

/* ---- NAVIGATION ---- */
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';

/* ---- CONTEXT ---- */
import {UserProvider, ThemeProvider} from './App.provider';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};
