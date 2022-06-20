import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {theme} from '../shared/themes';
import {useUserContext} from '../App.provider';
import {BattleCardHeader} from './BattleCardHeader.component';
import {Battle} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../shared/Types';
import {formatter} from '../shared/Methods';

export const BattleCard: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const userContext = useUserContext();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  battle.users = battle.users.sort(
    (a, b) =>
      b.current_gains_losses[battle.battle_id] -
      a.current_gains_losses[battle.battle_id],
  );

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('BattlePortfolio', {
          battle: battle,
          user_id: userContext.user.id,
        });
      }}
      style={styles.container}>
      <BattleCardHeader battle={battle} />

      {battle.users.map((member, index) => {
        return (
          <View
            key={member.user_id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingHorizontal: 20,
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
                    color: theme.colorPrimary,
                    fontFamily: theme.fontFamilyRegular,
                    fontSize: 12,
                    fontWeight: '700',
                  }}>
                  {member.first_name} {member.last_name}
                </Text>
                <Text style={styles.text}>
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
                color: theme.colorPrimary,
                fontFamily: theme.fontFamilyBold,
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
    backgroundColor: theme.greyPrimary,
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
    color: theme.colorPrimary,
    fontSize: 12,
    fontFamily: theme.fontFamilyRegular,
    fontWeight: '400',
  },
});
