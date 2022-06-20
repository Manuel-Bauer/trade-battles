import React from 'react';
import {useNavigation} from '@react-navigation/native';

/* ---- COMPONENTS ---- */
import {Text, View, Image, Pressable} from 'react-native';
import {Battle} from '../../shared/Types';
import {BattleCardHeader} from './BattleCardHeader.component';
import {ProfileScreenNavigationProp} from '../../shared/Types';

/* ---- STYLING ---- */
import {styles} from './BattleCard.styles';
import {getFormattedPL, getSortedRanks} from '../../shared/utils';

/* ---- CONTEXT ---- */
import {useAuth} from '../../Contexts/Auth';
import {useTheme} from '../../Contexts/Theme';

export const BattleCard: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const {currentUser} = useAuth();
  const {theme, darkMode} = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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
      <BattleCardHeader battle={battle} />

      {getSortedRanks(battle.battle_members, battle.battle_id).map(
        (member, index) => {
          return (
            <View
              key={member.user_id}
              style={{
                ...styles.battleMemberContainer,
                borderBottomColor: darkMode
                  ? theme.colors.darkest
                  : theme.colors.lighter,
              }}>
              <View style={styles.battleMemberContent}>
                <Image
                  key={member.user_id + member.photo}
                  style={styles.avatar}
                  source={{uri: member.photo}}
                />
                <View>
                  <Text
                    style={{
                      ...styles.battleMemberName,
                      color: theme.colors.textPrimary,
                      fontFamily: theme.fonts.regular,
                    }}>
                    {member.first_name} {member.last_name}
                  </Text>
                  <Text
                    style={{
                      ...styles.text,
                      color: theme.colors.textPrimary,
                      fontFamily: theme.fonts.regular,
                    }}>
                    {getFormattedPL(member, battle.battle_id)}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                }}>
                #{index + 1}
              </Text>
            </View>
          );
        },
      )}
    </Pressable>
  );
};
