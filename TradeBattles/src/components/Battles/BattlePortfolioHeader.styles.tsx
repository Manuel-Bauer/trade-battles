import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  portfolioHeaderContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '200',
  },

  portfolioValue: {
    fontWeight: '700',
    fontSize: 32,
    marginRight: 10,
  },
  returnContainer: {
    padding: 5,
    borderRadius: 7,
  },
  capitalAvailable: {
    fontSize: 20,
    fontWeight: '700',
  },
  totalValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  capitalAvailableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
