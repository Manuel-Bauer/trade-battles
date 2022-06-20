import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../Contexts/Theme';

export const BudgetPicker: React.FC<{
  setBattleBudget: React.Dispatch<React.SetStateAction<Number>>;
  battleBudget: Number;
}> = ({setBattleBudget, battleBudget}) => {
  const {theme, darkMode} = useTheme();
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={battleBudget}
        onValueChange={value => setBattleBudget(value)}>
        <Picker.Item label="100k" value="100" />
        <Picker.Item label="200k" value="200" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateButton: {
    width: '40%',
    height: 40,
    borderRadius: 10,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
