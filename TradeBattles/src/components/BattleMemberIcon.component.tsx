import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '../Contexts/Theme';

export const BattleMemberIcon: React.FC<{photo: string}> = ({photo}) => {
  const {theme, darkMode} = useTheme();
  return (
    <View style={{margin: 5}}>
      <View
        style={{
          padding: 1,
          borderRadius: 50,
          backgroundColor: darkMode ? theme.colors.light : theme.colors.dark,
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 2,
            borderRadius: 50,
            backgroundColor: darkMode
              ? theme.colors.dark
              : theme.colors.lightest,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              alignSelf: 'center',
            }}
            source={{uri: photo}}
          />
        </View>
      </View>
    </View>
  );
};
