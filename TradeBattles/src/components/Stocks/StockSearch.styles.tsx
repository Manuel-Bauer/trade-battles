import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  searchContainer: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  input: {
    height: '100%',
    flex: 4,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
  },
  resultCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 50,
    resizeMode: 'contain',
  },
});
