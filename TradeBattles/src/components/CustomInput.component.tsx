import React, {SetStateAction} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from '../Contexts/Theme';

type CustomInputProps = {
  value: any;
  setValue: React.Dispatch<SetStateAction<any>>;
  placeholder: string;
  secureTextEntry?: boolean;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholderTextColor={theme.colors.textSecondary}
        placeholder={placeholder}
        style={{
          ...styles.input,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.regular,
          borderColor: theme.colors.dark,
        }}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '82%',
    height: 50,
  },
  input: {
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
  },
});
