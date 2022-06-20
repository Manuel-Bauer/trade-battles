import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../Contexts/Theme';

export const BudgetPicker: React.FC<{
  setBattleBudget: React.Dispatch<React.SetStateAction<Number>>;
  battleBudget: Number;
}> = ({setBattleBudget, battleBudget}) => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <Picker
        style={{flex: 1}}
        itemStyle={{color: theme.colors.textPrimary}}
        selectedValue={battleBudget}
        onValueChange={value => setBattleBudget(value)}>
        <Picker.Item label="100k" value="100" />
        <Picker.Item label="200k" value="200" />
        <Picker.Item label="300k" value="300" />
        <Picker.Item label="400k" value="400" />
        <Picker.Item label="500k" value="500" />
        <Picker.Item label="600k" value="600" />
        <Picker.Item label="700k" value="700" />
        <Picker.Item label="800k" value="800" />
        <Picker.Item label="900k" value="900" />
        <Picker.Item label="1M" value="1M" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '5%',
    marginTop: '15%',
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
