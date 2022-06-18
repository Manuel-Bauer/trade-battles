import React, {SetStateAction} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {theme} from '../shared/themes';

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
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholderTextColor={theme.colorPrimary}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.greyPrimary,
    width: 250,
    height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 7,
    marginVertical: 7,
  },
  input: {
    fontFamily: theme.fontFamilyRegular,
    fontSize: 12,
  },
});
