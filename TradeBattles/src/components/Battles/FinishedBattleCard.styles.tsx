import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '100%',
    borderRadius: 45,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  winnerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerName: {
    fontSize: 20,
    fontWeight: '700',
  },
  winnerIcon: {
    height: 200,
    opacity: 0.5,
    resizeMode: 'contain',
    position: 'absolute',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
  },
  header: {
    height: 90,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  battleTitle: {
    fontSize: 25,
    fontWeight: '600',
    alignSelf: 'center',
  },
  finishedOnText: {
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
