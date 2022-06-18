import React from 'react';

/* ---- COMPONENTS ---- */
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {CustomButton} from '../components/CustomButton.component';
import LottieView from 'lottie-react-native';

/* ---- CONTEXTS ---- */
import {useTheme} from '../Contexts/Theme';
import {useAuth} from '../Contexts/Auth';

/* ---- ASSETS ---- */
const googleImageSource = require('../../assets/images/Google_logo.png');
const fallingMoneySrc = require('../../assets/lotties/falling_money.json');

export const LoginOnlySocial: React.FC = () => {
  const {login} = useAuth();
  const {theme} = useTheme();

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
          <Text style={{...styles.titlBold, color: theme.colors.textPrimary}}>
            TRADE
          </Text>
          <Text style={{...styles.titleLight, color: theme.colors.textPrimary}}>
            BATTLES
          </Text>
        </View>

        <View style={{marginBottom: 25, marginTop: 25}} />

        <CustomButton
          text="Sign In with Google"
          onPress={login}
          type="PRIMARY"
          backgroundColor={theme.colors.lighter}
          icon={googleImageSource}
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
  titlBold: {fontSize: 85},
  titleLight: {fontSize: 60, fontWeight: '900', marginTop: -10},
});
