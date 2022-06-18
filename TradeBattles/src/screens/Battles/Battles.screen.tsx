import React, {useState} from 'react';

/* ---- NAVIGATION ---- */
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../../shared/Types';

/* ---- COMPONENTS ---- */
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {BattleCardList} from '../../components/BattleCardList.component';
import type {Battle} from '../../shared/Types';

/* ---- CONTEXT ---- */
import {useTheme} from '../../Contexts/Theme';

/* ---- STYLES ---- */
import {styles} from './Battles.styles';
import LottieView from 'lottie-react-native';
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
        <View style={styles.arrows}>
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
        <View style={styles.noBattlesContainer}>
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

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
