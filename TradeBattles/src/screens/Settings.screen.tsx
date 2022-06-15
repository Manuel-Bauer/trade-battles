import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Switch} from 'react-native';
import {useThemeContext, useUserContext} from '../App.provider';
import {GoBack} from '../components/GoBack.component';
import {UserInitializer} from '../shared/EmptyInitializers';

export const Settings = () => {
  const themeContext = useThemeContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: themeContext.theme.light_mode_white,
    },
    user_info_header: {
      backgroundColor: themeContext.theme.greyPrimary,
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
  const userContext = useUserContext();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    themeContext.handleSetTheme(!themeContext.darkmode);
    setIsEnabled(previousState => !previousState);
  };

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
          fontFamily: themeContext.theme.fontFamilyBold,
          color: themeContext.theme.colorPrimary,
        }}>
        My Account
      </Text>
      <View style={styles.user_info_header}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50, marginBottom: 20}}
          source={{uri: userContext.user.photo ? userContext.user.photo : ''}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            fontFamily: themeContext.theme.fontFamilyRegular,
            color: themeContext.theme.colorPrimary,
          }}>
          {userContext.user.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            marginRight: 10,
            fontSize: 15,
            fontFamily: themeContext.theme.fontFamilyBold,
            color: themeContext.theme.colorPrimary,
          }}>
          Dark mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Pressable
        onPress={() => {
          userContext.handleSetUser(UserInitializer);
        }}
        style={{
          backgroundColor: themeContext.theme.colorPrimary,
          paddingVertical: 15,
          paddingHorizontal: 90,
          borderRadius: 10,
          marginTop: 40,
          marginBottom: 100,
        }}>
        <Text
          style={{
            color: themeContext.theme.light_mode_white,
            fontWeight: '800',
            fontFamily: themeContext.theme.fontFamilyBold,
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};
