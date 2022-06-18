import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addButton: {
    width: 45,
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 11,
    fontWeight: '700',
  },
  searchPhoto: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  searchItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchUserName: {
    fontSize: 12,
  },
  searchItemWithButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 5,
    padding: 10,
    borderBottomWidth: 1,
  },
});
