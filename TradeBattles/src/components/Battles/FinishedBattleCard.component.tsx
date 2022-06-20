import React from 'react';
import {useNavigation} from '@react-navigation/native';

/* ---- COMPONENTS ---- */
import {Text, View, Image, Pressable } from 'react-native';
import {Battle} from '../../shared/Types';
import {ProfileScreenNavigationProp} from '../../shared/Types';

/* ---- STYLING ---- */
import {styles} from './FinishedBattleCard.styles';

/* ---- CONTEXT ---- */
import {useAuth} from '../../Contexts/Auth';
import {useTheme} from '../../Contexts/Theme';

export const FinishedBattleCard: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const {currentUser} = useAuth();
  const {theme, darkMode} = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  battle.winner = '113650057549444546625';
  console.log('FinishedBattleCard: ', battle);

  const winner = battle.battle_members.find(
    member => member.user_id === battle.winner,
  );

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('BattlePortfolio', {
          battle: battle,
          user_id: currentUser.id,
        });
      }}
      style={{
        ...styles.container,
        backgroundColor: darkMode ? theme.colors.dark : theme.colors.lightest,
      }}>
      {/* HEADER */}
      <View style={{...styles.header}}>
        <Text
          style={{
            ...styles.battleTitle,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.bold,
          }}>
          {battle.battle_name}
        </Text>
        <Text
          style={{
            ...styles.finishedOnText,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.bold,
          }}>
          Finished on{' '}
          {String(
            Date(battle.end_date_timestamp).split(' ').slice(0, 4).join(' '),
          )}
        </Text>
      </View>

      <View style={styles.winnerContainer}>
        {/* WINNER MIT KRANZ */}
        <View
          key={winner.user_id}
          style={{
            ...styles.avatarContainer,
            borderBottomColor: darkMode
              ? theme.colors.darkest
              : theme.colors.lighter,
          }}>
          <Image
            source={require('../../../assets/images/winner.png')}
            style={{
              ...styles.winnerIcon,
              shadowColor: darkMode
                ? theme.colors.yellow
                : theme.colors.lightYellow,
              tintColor: darkMode
                ? theme.colors.yellow
                : theme.colors.darkYellow,
            }}></Image>
          <Image
            key={winner.user_id + winner.photo}
            style={styles.avatar}
            source={{uri: winner.photo}}
          />
        </View>

        <Text
          style={{
            ...styles.winnerName,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.regular,
          }}>
          {winner.first_name} {winner.last_name}
        </Text>
      </View>
    </Pressable>
  );
};
