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
  battleMemberContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  battleMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    borderBottomWidth: 1,
  },
  battleMemberName: {
    fontSize: 12,
    fontWeight: '700',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});
