import React from 'react';
import {Svg, Path} from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

// react-svgr.com/playground for converting svg into valid react native format

export const SwordIcon: React.FC<IconProps> = ({
  size = 40,
  color = 'black',
}) => {
  return (
    <Svg width={size} height={size} color={color}>
      <Path d="m30.146 28.561-1.586 1.586c-.292.292-.676.438-1.061.438s-.768-.146-1.061-.438l-4.293-4.293-2.232 2.232c-.391.391-.902.586-1.414.586s-1.024-.195-1.414-.586l-.172-.172a2 2 0 0 1 0-2.828l8.172-8.172c.391-.391.902-.586 1.414-.586s1.024.195 1.414.586l.172.172a2 2 0 0 1 0 2.828l-2.232 2.232 4.293 4.293a1.502 1.502 0 0 1 0 2.122zm-7.805-10.317-4.097 4.097-14.765-8.685A3.012 3.012 0 0 1 2 11.07V3c0-.551.449-1 1-1h8.07c1.058 0 2.049.567 2.586 1.479l8.685 14.765zm-2.987 1.11a.5.5 0 0 0 0-.707l-15.5-15.5a.5.5 0 0 0-.707.707l15.5 15.5a.498.498 0 0 0 .707 0z" />
    </Svg>
  );
};
