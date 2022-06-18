import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {CustomInput} from '../../components/CustomInput.component';
import {StartEndDatePicker} from '../../components/StartEndDatePicker.component';
import {ApiClient} from '../../services/ApiClient.service';
import {theme} from '../../shared/themes';
import {BattleMember} from '../../shared/Types';
import {CustomModal} from '../../components/CustomModal';
import {BattleMemberIcon} from '../../components/BattleMemberIcon.component';
import {GoBack} from '../../components/GoBack.component';

export const CreateBattle = () => {
  const [addedMembers, setAddedMembers] = useState<BattleMember[]>([]);
  const [battleName, setBattleName] = useState('');
  const [search, setSearch] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [members, setMembers] = useState<BattleMember[]>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [successfulCreate, setSuccessfulCreate] = useState(false);

  const getMembers = async () => {
    ApiClient.getAllUsers().then(res => {
      setMembers(res.data);
    });
  };

  useEffect(() => {
    setStartDate(new Date(Date.now()));
    setEndDate(new Date(Date.now()));
  }, []);

  useEffect(() => {
    getMembers();
  }, []);

  const handleCreate = () => {
    formIsValid()
      ? (ApiClient.createBattle(
          addedMembers.map(el => el.user_id),
          startDate.getTime(),
          endDate.getTime(),
          battleName,
        ),
        setSuccessfulCreate(true),
        setAddedMembers([]),
        setBattleName(''),
        setEndDate(new Date()),
        setStartDate(new Date()))
      : setErrorMessage(true);
  };

  const formIsValid = () => {
    return battleName.length > 0 &&
      startDate.getTime() > Date.now() &&
      endDate.getTime() > Date.now() &&
      startDate.getTime() < endDate.getTime() &&
      addedMembers.length > 0
      ? true
      : false;
  };
  return (
    <View style={styles.container}>
      <View style={{marginRight: 'auto'}}>
        <GoBack />
      </View>
      <Text style={styles.title}>Battle Name</Text>
      <CustomInput
        value={battleName}
        setValue={setBattleName}
        placeholder={'Choose a name for your battle...'}
        secureTextEntry={false}
      />
      <Text style={styles.title}>Members</Text>
      <CustomInput
        value={search}
        setValue={setSearch}
        placeholder={'Search for people here...'}
        secureTextEntry={false}
      />
      {members?.map(el =>
        (el.first_name.toLowerCase().includes(search.toLowerCase()) ||
          el.last_name.toLowerCase().includes(search.toLowerCase()) ||
          el.email.toLowerCase().includes(search.toLowerCase())) &&
        search.length ? (
          <View key={el.email} style={styles.search_item_with_button_container}>
            <View style={styles.search_item_container}>
              <Image style={styles.search_photo} source={{uri: el.photo}} />
              <Text style={styles.search_user_name}>
                {el.first_name} {el.last_name}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setAddedMembers(prevState => [...prevState, el]);
                setSearch('');
              }}
              style={styles.add_button}>
              <Text style={styles.add_text}>ADD</Text>
            </Pressable>
          </View>
        ) : undefined,
      )}

      <View style={{flexDirection: 'row'}}>
        {addedMembers.map(el => (
          <BattleMemberIcon key={el.email} photo={el.photo} />
        ))}
      </View>
      <Text style={styles.title}>Select start and end dates</Text>
      <StartEndDatePicker
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        endDate={endDate}
        startDate={startDate}
      />

      {startDate.getTime() > Date.now() && (
        <Text>Battle will start on: {startDate.toDateString()}</Text>
      )}
      {endDate.getTime() > Date.now() && (
        <Text>Battle will end on: {endDate.toDateString()}</Text>
      )}

      <Pressable onPress={() => handleCreate()} style={styles.create_button}>
        <Text style={styles.create_text}>CREATE</Text>
      </Pressable>
      <CustomModal
        viewable={errorMessage}
        setViewable={setErrorMessage}
        text="Please fill out all the fields"
      />
      <CustomModal
        viewable={successfulCreate}
        setViewable={setSuccessfulCreate}
        text="Success! The battle has been succesfully created"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.light_mode_white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 15,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorPrimary,
  },
  add_button: {
    backgroundColor: theme.colorPrimary,
    width: 45,
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_text: {
    color: theme.light_mode_white,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: theme.fontFamilyBold,
  },
  create_button: {
    backgroundColor: theme.colorPrimary,
    width: '80%',
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  create_text: {
    color: theme.light_mode_white,
    fontWeight: '900',
    fontFamily: theme.fontFamilyBold,
  },
  search_photo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  search_item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  search_user_name: {
    color: theme.colorPrimary,
    fontSize: 12,
    fontFamily: theme.fontFamilyRegular,
  },
  search_item_with_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginVertical: 2,
  },
});
