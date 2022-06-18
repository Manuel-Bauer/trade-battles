import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  profileCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: '400',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginRight: 10,
    fontSize: 15,
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 100,
  },
  logoutButtonText: {
    fontWeight: '800',
  },
});
