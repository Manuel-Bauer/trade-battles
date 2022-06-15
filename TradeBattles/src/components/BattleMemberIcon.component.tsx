import React from 'react';
import {View, Image} from 'react-native';
import {theme} from '../shared/themes';

export const BattleMemberIcon: React.FC<{photo: string}> = ({photo}) => {
  return (
    <View style={{margin: 5}}>
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 50,
          backgroundColor: theme.colorPrimary,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 50,
            backgroundColor: theme.light_mode_white,
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
