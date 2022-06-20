import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  type?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: ImageSourcePropType;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  type = 'PRIMARY',
  backgroundColor,
  textColor = 'black',
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        type === 'TERCIARY'
          ? styles.container_TERCIARY
          : type === 'PRIMARY'
          ? styles.container_PRIMARY
          : undefined,
      ]}>
      {icon ? <Image source={icon} style={styles.icon} /> : undefined}
      <Text
        style={[
          styles.text,
          {color: textColor},
          type === 'TERCIARY'
            ? styles.text_TERCIARY
            : type === 'PRIMARY'
            ? styles.text_PRIMARY
            : undefined,
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    alignItems: 'center',
    borderRadius: 7,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  container_PRIMARY: {
    marginVertical: 5,
  },
  container_SECONDARY: {},
  container_TERCIARY: {},

  text: {},

  text_PRIMARY: {
    fontWeight: '700',
  },
  text_TERCIARY: {
    fontWeight: '500',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: -10,
    marginRight: 10,
  },
});
