import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 15,
  },

  back: {
    height: 30,
    width: 30,
  },
  tradeButton: {
    width: '80%',
    height: 60,
    borderRadius: 15,
    padding: 10,
    marginTop: 35,
    justifyContent: 'center',
  },
  tradeButtonText: {
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  watchlistStar: {
    marginLeft: 'auto',
    marginRight: 35,
    marginTop: -40,
    marginBottom: 25,
  },
  averageCostText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
