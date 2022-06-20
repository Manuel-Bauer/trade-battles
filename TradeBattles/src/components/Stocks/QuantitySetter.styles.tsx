import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  quantity_setter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 30,
  },
  quantity_selected: {
    fontSize: 25,
  },
  arrow: {
    width: 25,
    height: 25,
  },
  arrow_button: {
    padding: 20,
    borderRadius: 50,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
});
