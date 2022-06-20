import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '../../Contexts/Theme';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const GoBack: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        marginTop: height * 0.06,
        paddingHorizontal: width * 0.05,
        paddingVertical: 10,
      }}>
      <Svg width={30} height={30} viewBox="0 0 200.223 373.254">
        <Path
          id="Path_12"
          data-name="Path 12"
          d="M284.34,3.512a9,9,0,0,0-1.375-1.117,9.184,9.184,0,0,0-3.262-1.34,9.115,9.115,0,0,0-3.523,0,9.184,9.184,0,0,0-3.262,1.34,9.194,9.194,0,0,0-1.375,1.117L86.727,188.586l182.684,182.9a8.822,8.822,0,0,0,1.375,1.125,8.7,8.7,0,0,0,1.563.836,9.133,9.133,0,0,0,1.7.516,8.929,8.929,0,0,0,1.766.172,8.959,8.959,0,0,0,3.461-.687,9.115,9.115,0,0,0,1.563-.84,8.793,8.793,0,0,0,1.371-1.125,9.464,9.464,0,0,0,1.125-1.371,9.029,9.029,0,0,0,1.523-5.031,8.968,8.968,0,0,0-.172-1.77,9.251,9.251,0,0,0-.512-1.7,9.568,9.568,0,0,0-.836-1.566,8.978,8.978,0,0,0-1.125-1.371L112.32,188.551,284.34,16.289a9.049,9.049,0,0,0,1.93-2.938,8.871,8.871,0,0,0,.508-1.691,9.095,9.095,0,0,0,0-3.52,8.871,8.871,0,0,0-.508-1.691,9.049,9.049,0,0,0-1.93-2.938Zm0,0"
          transform="translate(-86.727 -0.883)"
          fill={theme.colors.light}
        />
      </Svg>
    </Pressable>
  );
};
