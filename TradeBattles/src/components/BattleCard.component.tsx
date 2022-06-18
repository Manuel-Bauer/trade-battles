import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';

import {useUserContext} from '../App.provider';
import {BattleCardHeader} from './BattleCardHeader.component';
import {Battle} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../shared/Types';
import {formatter} from '../shared/Methods';
import {useAuth} from '../Contexts/Auth';
import {useTheme} from '../Contexts/Theme';

export const BattleCard: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const {currentUser} = useAuth();
  const {theme, darkMode} = useTheme();
  const userContext = useUserContext();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  /* RANKING */
  battle.battle_members = battle.battle_members.sort(
    (a, b) =>
      b.current_gains_losses[battle.battle_id] -
      a.current_gains_losses[battle.battle_id],
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
      <BattleCardHeader battle={battle} />

      {battle.battle_members.map((member, index) => {
        return (
          <View
            key={member.user_id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 50,
              borderBottomColor: darkMode
                ? theme.colors.darkest
                : theme.colors.lighter,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                key={member.user_id + member.photo}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: member.photo}}
              />
              <View>
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                    fontSize: 12,
                    fontWeight: '700',
                  }}>
                  {member.first_name} {member.last_name}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.regular,
                  }}>
                  {formatter.format(
                    member.current_gains_losses[String(battle.battle_id)]
                      ? member.current_gains_losses[String(battle.battle_id)]
                      : 0,
                  )}
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

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '100%',
    borderRadius: 45,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
});
