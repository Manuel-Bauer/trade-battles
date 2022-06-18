import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../Contexts/Theme';

export const StartEndDatePicker: React.FC<{
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
  endDate: Date;
}> = ({setStartDate, setEndDate, startDate, endDate}) => {
  const {theme, darkMode} = useTheme();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={{
          ...styles.dateButton,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lighter,
        }}
        onPress={() => setOpenStartDatePicker(true)}>
        <Text
          style={{
            ...styles.buttonText,
            fontFamily: theme.fonts.bold,
            color: theme.colors.textPrimary,
          }}>
          {startDate ? (
            <Text>{startDate.toDateString()}</Text>
          ) : (
            'Pick Start Date'
          )}
        </Text>
      </Pressable>

      <Pressable
        style={{
          ...styles.dateButton,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lighter,
        }}
        onPress={() => setOpenEndDatePicker(true)}>
        <Text
          style={{
            ...styles.buttonText,
            fontFamily: theme.fonts.bold,
            color: theme.colors.textPrimary,
          }}>
          {endDate ? <Text>{endDate.toDateString()}</Text> : 'Pick End Date'}
        </Text>
      </Pressable>

      <DatePicker
        modal
        open={openStartDatePicker}
        date={startDate || new Date()}
        onConfirm={date => {
          setOpenStartDatePicker(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setOpenStartDatePicker(false);
        }}
      />

      <DatePicker
        modal
        open={openEndDatePicker}
        date={endDate || new Date()}
        onConfirm={date => {
          setOpenEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setOpenEndDatePicker(false);
        }}
      />
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
