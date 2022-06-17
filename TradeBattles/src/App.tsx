import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';
import {UserProvider, ThemeProvider} from './App.provider';
import {ImageBackground, LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {showNotification} from './shared/Notification';
import {SafeAreaView} from 'react-native-safe-area-context';
/* 
 Note: Change Background image depending on darkMode
*/
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
