import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Switch} from 'react-native';
import {GoBack} from '../components/GoBack.component';

/* ---- CONTEXT ---- */
import {useAuth} from '../Contexts/Auth';
import {useTheme} from '../Contexts/Theme';

export const Settings = () => {
  const {logout, currentUser} = useAuth();
  const {toggleDarkMode, darkMode, theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
    },
    user_info_header: {
      backgroundColor: darkMode ? theme.colors.dark : theme.colors.lightest,
      padding: 20,
      borderRadius: 15,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 1,
      shadowOpacity: 0.3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{marginRight: 'auto'}}>
        <GoBack />
      </View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: '600',
          paddingHorizontal: 20,
          fontFamily: theme.fonts.bold,
          color: theme.colors.textPrimary,
        }}>
        My Account
      </Text>
      <View style={styles.user_info_header}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50, marginBottom: 20}}
          source={{uri: currentUser.photo ? currentUser.photo : ''}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: theme.fonts.regular,
            color: theme.colors.textSecondary,
          }}>
          {currentUser.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            marginRight: 10,
            fontSize: 15,
            fontFamily: theme.fonts.bold,
            color: theme.colors.textPrimary,
          }}>
          Dark mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>

      <Pressable
        onPress={logout}
        style={{
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lighter,
          paddingVertical: 15,
          paddingHorizontal: 90,
          borderRadius: 10,
          marginTop: 40,
          marginBottom: 100,
        }}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontWeight: '800',
            fontFamily: theme.fonts.bold,
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};
