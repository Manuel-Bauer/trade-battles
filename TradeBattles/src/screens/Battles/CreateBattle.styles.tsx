import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 30,
  },
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
  createButton: {
    width: '80%',
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  createText: {
    fontWeight: '900',
  },
  search_photo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  search_item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchUserName: {
    fontSize: 12,
  },
  search_item_with_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 5,
    padding: 10,
    borderBottomWidth: 1,
  },
});
