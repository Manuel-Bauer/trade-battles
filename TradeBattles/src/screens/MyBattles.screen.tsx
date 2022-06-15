import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Pressable} from 'react-native';
import {theme} from '../shared/themes';
import type {Battle} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../shared/Types';
import LottieView from 'lottie-react-native';
import {BattleCardList} from '../components/BattleCardList.component';

const pointingArrowSrc = require('../../assets/lotties/pointing_arrow.json');

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);
  const [noBattles, setNoBattles] = useState(false);

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.create_battle_button}
        onPress={() => navigation.navigate('CreateBattle')}>
        <Text style={styles.create_battle_button_text}>+</Text>
      </Pressable>
      {noBattles && (
        <View style={styles.no_battle_point_arrows}>
          <LottieView source={pointingArrowSrc} autoPlay />
        </View>
      )}
      <Text style={styles.header}>My Battles</Text>

      {noBattles ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.no_battles_message}>
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
    backgroundColor: theme.light_mode_white,
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: -25,
    color: theme.colorPrimary,
    fontFamily: theme.fontFamilyBold,
  },
  create_battle_button: {
    width: 40,
    height: 40,
    marginLeft: 'auto',
    marginRight: 40,
    marginTop: 20,
    backgroundColor: theme.colorPrimary,
    borderRadius: 50,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  create_battle_button_text: {
    fontSize: 30,
    color: theme.light_mode_white,
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
  no_battles_message: {
    color: theme.colorPrimary,
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: '40%',
    paddingHorizontal: 30,
  },
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
