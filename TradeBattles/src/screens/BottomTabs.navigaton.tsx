import React from 'react';

/* ---- NAVIGATION ---- */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './AppStackNavigator.navigation';
const BottomTabs = createBottomTabNavigator();

/* ---- COMPONENTS ---- */
import {
  HomeIcon,
  WatchlistIcon,
  UserIcon,
} from '../components/BottomTabIcons.component';
import {WatchList} from './Watchlist.screen';
import {Settings} from './Settings/Settings.screen';

/* ---- CONTEXT ---- */
import {useTheme} from '../Contexts/Theme';

export const BottomTabsNavigator: React.FC = () => {
  const {theme, darkMode} = useTheme();
  return (
    <BottomTabs.Navigator
      initialRouteName="StackNavigator"
      screenOptions={({route}) => ({
        ...screenOptions,
        tabBarActiveTintColor: darkMode
          ? theme.colors.lightest
          : theme.colors.darker,
        tabBarInactiveTintColor: darkMode
          ? theme.colors.light
          : theme.colors.light,
        tabBarStyle: {
          backgroundColor: darkMode
            ? theme.colors.darker
            : theme.colors.lighter,
        },
        tabBarIcon: props => {
          switch (route.name) {
            case 'StackNavigator':
              return <HomeIcon size={props.size + 10} color={props.color} />;
            case 'Watchlist':
              return (
                <WatchlistIcon size={props.size + 10} color={props.color} />
              );
            case 'Settings':
              return <UserIcon size={props.size + 10} color={props.color} />;
          }
        },
      })}>
      <BottomTabs.Screen name="Watchlist" component={WatchList} />
      <BottomTabs.Screen name="StackNavigator" component={StackNavigator} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  borderTopWidth: 0,
  height: 90,
  padding: 10,
};
