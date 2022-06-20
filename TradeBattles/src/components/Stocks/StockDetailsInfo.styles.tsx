import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '800',
    marginLeft: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  price: {
    fontSize: 45,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
  change_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 12,
  },
  change_text: {
    fontSize: 15,
    marginBottom: 6,
  },
  changePill: {
    borderRadius: 10,
    padding: 5,
  },
  changeText: {
    color: 'white',
    fontWeight: '700',
  },
  logo_ticker_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  changes_row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  date_button: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
  },
  durationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: -20,
  },
});
