import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {CustomInput} from '../components/CustomInput.component';
import {CustomButton} from '../components/CustomButton.component';
import {theme} from '../shared/themes';
const googleImageSource = require('../../assets/images/Google_logo.png');

const logoSrc = require('../../assets/images/Placeholder_logo.png');

export const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onLogInPressed = () => {
    console.warn('Signed In');
  };
  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  };

  const onSignInWithGooglePressed = () => {
    console.warn('Google Sign In');
  };

  const onSignUpPressed = () => {
    console.warn('Sign Up');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={logoSrc}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          value={userName}
          setValue={setUserName}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Sign In"
          onPress={onLogInPressed}
          type="PRIMARY"
          textColor="white"
          backgroundColor={theme.primary_green}
        />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERCIARY"
        />
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInWithGooglePressed}
          type="PRIMARY"
          backgroundColor={theme.primary_grey}
          icon={googleImageSource}
        />
        <CustomButton
          text="Create an account"
          onPress={onSignUpPressed}
          type="TERCIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {alignItems: 'center', padding: 20, marginTop: 60},
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
