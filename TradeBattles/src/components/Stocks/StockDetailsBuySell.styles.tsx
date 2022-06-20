import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: '33%',
    borderRadius: 10,
    marginHorizontal: 15,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },

  buy_sell_modal_container: {
    flexDirection: 'column',
    marginTop: 250,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    height: 300,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close_icon: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 20,
  },
  total_amount: {flexDirection: 'row', alignItems: 'center'},

  buysell_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
});
