import React from 'react';

/* ---- COMPONENTS ---- */
import {WatchlistList} from '../../components/Watchlist/WatchlistList.component';
import {View, Text, StyleSheet} from 'react-native';

/* ---- CONTEXT ---- */
import {useTheme} from '../../Contexts/Theme';

export const WatchList = () => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <Text
        style={{
          ...styles.heading,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
        }}>
        Watchlist
      </Text>
      <WatchlistList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 100,
    marginBottom: 30,
  },
});
