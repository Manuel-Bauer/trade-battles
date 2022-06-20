import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAuth} from '../../Contexts/Auth';
import {useTheme} from '../../Contexts/Theme';
import {Battle} from '../../shared/Types';

export const BattleCardHeader: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const {theme} = useTheme();
  const {currentUser} = useAuth();

  let position = 0;
  battle.battle_members.filter((el, index) => {
    if (el.user_id === currentUser.id) position = index;
  });

  const determinePositionEnding = (pos: number) => {
    const lastNumber = Number(String(pos)[String(pos).length - 1]);
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
    <View style={{...styles.container, backgroundColor: theme.colors.primary}}>
      <Text
        style={{
          ...styles.title,
          color: theme.colors.lightest,
          fontFamily: theme.fonts.bold,
        }}>
        {battle.battle_name}
      </Text>
      <Text
        style={{
          ...styles.subTitle,
          color: theme.colors.lightest,
          fontFamily: theme.fonts.regular,
        }}>
        You're {position + 1}
        {determinePositionEnding(position + 1)}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 15,
    alignSelf: 'center',
  },
  subTitle: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '300',
  },
});
