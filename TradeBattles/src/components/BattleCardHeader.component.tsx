import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../App.provider';

import {theme} from '../shared/themes';
import {Battle} from '../shared/Types';

export const BattleCardHeader: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  let position = 0;
  battle.battle_members.filter((el, index) => {
    if (el.user_id === useUserContext().user.id) position = index;
  });

  const determinePositionEnding = (position: number) => {
    const lastNumber = Number(String(position)[String(position).length - 1]);
    switch (lastNumber) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      case 4 || 5 || 6 || 7 || 8 || 9 || 0:
        return 'th';
      default:
        return 'th';
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header_small}>{battle.battle_name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop: 5,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 25,
            fontWeight: '300',
            color: theme.colorPrimary,
            fontFamily: theme.fontFamilyRegular,
          }}>
          #{position + 1}
          {determinePositionEnding(position + 1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary_yellow,
    height: 90,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    marginBottom: 20,
  },
  header_small: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 15,
    alignSelf: 'center',
    color: theme.colorPrimary,
    fontFamily: theme.fontFamilyBold,
  },
});
