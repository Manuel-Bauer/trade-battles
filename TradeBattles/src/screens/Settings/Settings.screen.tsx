import React from 'react';

/* ---- COMPONENTS ---- */
import {View, Text, Image, Pressable, Switch} from 'react-native';
import {GoBack} from '../../components/Misc/GoBack.component';

/* ---- CONTEXT ---- */
import {useAuth} from '../../Contexts/Auth';
import {useTheme} from '../../Contexts/Theme';

/* ---- CONTEXT ---- */
import {styles} from './Settings.styles';

export const Settings = () => {
  const {logout, currentUser} = useAuth();
  const {toggleDarkMode, darkMode, theme} = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <View style={{marginRight: 'auto'}}>
        <GoBack />
      </View>
      <Text
        style={{
          ...styles.heading,
          fontFamily: theme.fonts.bold,
          color: theme.colors.textPrimary,
        }}>
        My Account
      </Text>
      <View
        style={{
          ...styles.profileCard,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lightest,
        }}>
        <Image
          style={styles.profileImage}
          source={{uri: currentUser.photo ? currentUser.photo : ''}}
        />
        <Text
          style={{
            ...styles.profileText,
            fontFamily: theme.fonts.regular,
            color: theme.colors.textSecondary,
          }}>
          {currentUser.name}
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text
          style={{
            ...styles.switchText,
            fontFamily: theme.fonts.bold,
            color: theme.colors.textPrimary,
          }}>
          Dark mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>

      <Pressable
        onPress={logout}
        style={{
          ...styles.logoutButton,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lighter,
        }}>
        <Text
          style={{
            ...styles.logoutButtonText,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.bold,
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};
