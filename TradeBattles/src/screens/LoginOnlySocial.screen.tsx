import React from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Text,
} from 'react-native';
import {CustomButton} from '../components/CustomButton.component';
import {theme} from '../shared/themes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import LottieView from 'lottie-react-native';

const googleImageSource = require('../../assets/images/Google_logo.png');
const facebookImageSource = require('../../assets/images/Facebook_logo.png');
const appleImageSource = require('../../assets/images/Apple_logo.png');

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '590254695836-9ai733i10c8phjeh71t0e5vp0hctm905.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const fallingMoneySrc = require('../../assets/lotties/falling_money.json');

export const LoginOnlySocial: React.FC = () => {
  const userContext = useUserContext();
  const {height} = useWindowDimensions();

  const onSignInWithGooglePressed = async () => {
    try {
      const {user} = await GoogleSignin.signIn();
      userContext.handleSetUser({...user, watchlist: []});
      ApiClient.handleSignIn({...user, watchlist: []});
    } catch (error) {
      console.error(error);
    }
  };

  // TODO -> Facebook signin
  const onSignInWithFacebookPressed = () => {
    userContext.handleSetUser({
      id: 'c3e56754-7abb-43d8-811d-52186035e1be',
      name: 'Sebastian Fernandez',
      email: 'sebasfdz@gmail.com',
      photo: 'https://picsum.photos/200',
      familyName: 'Sebastian',
      givenName: 'Fernandez',
      watchlist: [],
    });
  };

  const onSignInWithApplePressed = async () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <LottieView
            style={{marginTop: -25}}
            source={fallingMoneySrc}
            autoPlay
            loop={false}
          />
          <Text style={styles.logo_bold}>TRADE</Text>
          <Text style={styles.logo_light}>BATTLES</Text>
        </View>

        <View style={{marginBottom: 25, marginTop: 25}}></View>

        <CustomButton
          text="Sign In with Google"
          onPress={onSignInWithGooglePressed}
          type="PRIMARY"
          backgroundColor={theme.greyPrimary}
          icon={googleImageSource}
        />
        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInWithFacebookPressed}
          type="PRIMARY"
          backgroundColor={theme.greyPrimary}
          icon={facebookImageSource}
        />
        <CustomButton
          text="Sign In with Apple"
          onPress={onSignInWithApplePressed}
          type="PRIMARY"
          backgroundColor={theme.greyPrimary}
          icon={appleImageSource}
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
  logo_bold: {fontSize: 85},
  logo_light: {fontSize: 60, fontWeight: '900', marginTop: -10},
});
