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
        itemStyle={{color: theme.colors.textPrimary, fontSize: 18}}
        selectedValue={battleBudget}
        onValueChange={value => setBattleBudget(value)}>
        <Picker.Item label="100k USD" value="100000" />
        <Picker.Item label="200k USD" value="200000" />
        <Picker.Item label="300k USD" value="300000" />
        <Picker.Item label="400k USD" value="400000" />
        <Picker.Item label="500k USD" value="500000" />
        <Picker.Item label="600k USD" value="600000" />
        <Picker.Item label="700k USD" value="700000" />
        <Picker.Item label="800k USD" value="800000" />
        <Picker.Item label="900k USD" value="900000" />
        <Picker.Item label="1M USD" value="1000000" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '2%',
    marginTop: '15%',
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
