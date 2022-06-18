import React from 'react';

/* ---- NAVIGATION ---- */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BattlesNavigation} from './Battles/Battles.navigation';
const BottomTabs = createBottomTabNavigator();

/* ---- COMPONENTS ---- */
import {
  HomeIcon,
  WatchlistIcon,
  UserIcon,
} from '../components/BottomTabIcons.component';
import {WatchList} from './Watchlist/Watchlist.screen';
import {Settings} from './Settings/Settings.screen';

/* ---- CONTEXT ---- */
import {useTheme} from '../Contexts/Theme';

export const BottomTabsNavigator: React.FC = () => {
  const {theme, darkMode} = useTheme();
  return (
    <BottomTabs.Navigator
      initialRouteName="Battles"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
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
          height: 90,
          padding: 10,
          borderTopWidth: 0,
        },
        tabBarIcon: props => {
          switch (route.name) {
            case 'Battles':
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
      <BottomTabs.Screen name="Battles" component={BattlesNavigation} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
};
