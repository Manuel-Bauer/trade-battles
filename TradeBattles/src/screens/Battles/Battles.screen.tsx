import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Pressable} from 'react-native';
import type {Battle} from '../../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../../shared/Types';
import LottieView from 'lottie-react-native';
import {BattleCardList} from '../../components/BattleCardList.component';
import {useTheme} from '../../Contexts/Theme';

const pointingArrowSrc = require('../../../assets/lotties/pointing_arrow.json');

export const Battles: React.FC = () => {
  const {theme} = useTheme();
  const [myBattles, setMyBattles] = useState<Battle[]>([]);
  const [noBattles, setNoBattles] = useState(false);

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{
          ...styles.createBattleButton,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => navigation.navigate('CreateBattle')}>
        <Text
          style={{
            ...styles.createBattleButtonText,
            color: theme.colors.textPrimary,
          }}>
          +
        </Text>
      </Pressable>
      {noBattles && (
        <View style={styles.no_battle_point_arrows}>
          <LottieView source={pointingArrowSrc} autoPlay />
        </View>
      )}
      <Text
        style={{
          ...styles.header,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.bold,
        }}>
        My Battles
      </Text>

      {noBattles ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...styles.noBattlesMessage,
              color: theme.colors.textPrimary,
            }}>
            You currently have no battles, create one with the top right button!
          </Text>
        </View>
      ) : (
        <BattleCardList
          myBattles={myBattles}
          setMyBattles={setMyBattles}
          setNoBattles={setNoBattles}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: -25,
  },
  createBattleButton: {
    width: 40,
    height: 40,
    marginLeft: 'auto',
    marginRight: 40,
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  createBattleButtonText: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'center',
  },
  no_battle_point_arrows: {
    transform: [{rotate: '180deg'}],
    paddingHorizontal: 60,
    marginLeft: 'auto',
    width: 70,
    height: 70,
  },
  noBattlesMessage: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: '40%',
    paddingHorizontal: 30,
  },
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
