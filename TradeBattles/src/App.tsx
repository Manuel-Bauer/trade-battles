import React from 'react';

/* ---- NAVIGATION ---- */
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';

/* ---- CONTEXT ---- */
import {UserProvider, ThemeProvider} from './App.provider';
import {ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <ImageBackground
            style={{flex: 1, justifyContent: 'center'}}
            source={require('../assets/images/background_dark.png')}>
            <SafeAreaView style={{flex: 1}}>
              <Navigation />
            </SafeAreaView>
          </ImageBackground>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};
