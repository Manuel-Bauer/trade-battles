import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './AppStackNavigator.navigation';
import {theme} from '../shared/themes';
import {
  HomeIcon,
  WatchlistIcon,
  UserIcon,
} from '../components/BottomTabIcons.component';
import {WatchList} from './Watchlist.screen';
import {Settings} from './Settings.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="StackNavigator"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colorPrimary,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colorPrimary,
          borderTopWidth: 1,
          height: 90,
          padding: 10,
        },
        tabBarIcon: () => {
          switch (route.name) {
            case 'StackNavigator':
              return <HomeIcon color={theme.light_mode_white} size={38} />;

            case 'Watchlist':
              return <WatchlistIcon color={theme.light_mode_white} size={30} />;
            case 'Settings':
              return <UserIcon color={theme.light_mode_white} size={33} />;
          }
        },
      })}>
      <BottomTabs.Screen name="Watchlist" component={WatchList} />
      <BottomTabs.Screen name="StackNavigator" component={StackNavigator} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
};
