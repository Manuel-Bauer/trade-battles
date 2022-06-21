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

      {getSortedRanks(battle.transaction, battle.id).map((user, index) => {
        return (
          <View
            key={user.id}
            style={{
              ...styles.battleMemberContainer,
              borderBottomColor: darkMode
                ? theme.colors.darkest
                : theme.colors.lighter,
            }}>
            <View style={styles.battleMemberContent}>
              <Image
                key={user.id + user.photo}
                style={styles.avatar}
                source={{uri: user.photo}}
              />
              <View>
                <Text
                  style={{
                    ...styles.battleMemberName,
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  }}>
                  {user.givenName} {user.familyName}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  }}>
                  {getFormattedPL(user, battle.id)}
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
      })}
    </Pressable>
  );
};
