import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {theme} from '../shared/themes';

export const StartEndDatePicker: React.FC<{
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
  endDate: Date;
}> = ({setStartDate, setEndDate, startDate, endDate}) => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.date_button}
        onPress={() => setOpenStartDatePicker(true)}>
        <Text style={styles.button_text}>Pick Start Date</Text>
      </Pressable>

      <Pressable
        style={styles.date_button}
        onPress={() => setOpenEndDatePicker(true)}>
        <Text style={styles.button_text}>Pick End Date</Text>
      </Pressable>

      <DatePicker
        modal
        open={openStartDatePicker}
        date={startDate}
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
        date={endDate}
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
  date_button: {
    backgroundColor: theme.primary_yellow,
    width: '40%',
    height: 40,
    borderRadius: 10,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: theme.fontFamilyRegular,
  },
});
