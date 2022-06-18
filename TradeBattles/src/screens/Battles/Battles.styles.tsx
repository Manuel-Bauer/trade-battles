import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: -25,
  },
  createBattleButton: {
    width: 40,
    height: 40,
    marginLeft: 'auto',
    marginRight: 40,
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  createBattleButtonText: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
  },
  arrows: {
    transform: [{rotate: '180deg'}],
    paddingHorizontal: 60,
    marginLeft: 'auto',
    width: 70,
    height: 70,
  },
  noBattlesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBattlesMessage: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: '40%',
    paddingHorizontal: 30,
  },
});
