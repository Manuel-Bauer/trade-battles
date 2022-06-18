import React, {useEffect, useState} from 'react';

/* ---- COMPONENTS ---- */
import {View, Text, Image, Pressable} from 'react-native';
import {CustomInput} from '../../components/CustomInput.component';
import {StartEndDatePicker} from '../../components/StartEndDatePicker.component';
import {ApiClient} from '../../services/ApiClient.service';
import {BattleMember} from '../../shared/Types';
import {CustomModal} from '../../components/CustomModal';
import {BattleMemberIcon} from '../../components/BattleMemberIcon.component';
import {GoBack} from '../../components/GoBack.component';

/* ---- CONTEXT ---- */
import {useTheme} from '../../Contexts/Theme';
import {styles} from './CreateBattle.styles';

export const CreateBattle = () => {
  const {theme} = useTheme();
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
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <View style={{marginRight: 'auto'}}>
        <GoBack />
      </View>
      <Text
        style={{
          ...styles.title,
          fontFamily: theme.fonts.bold,
          color: theme.colors.textPrimary,
        }}>
        Battle Name
      </Text>
      <CustomInput
        value={battleName}
        setValue={setBattleName}
        placeholder={'Choose a name for your battle...'}
        secureTextEntry={false}
      />
      <Text
        style={{
          ...styles.title,
          fontFamily: theme.fonts.bold,
          color: theme.colors.textPrimary,
        }}>
        Members
      </Text>
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
              <Text
                style={{
                  ...styles.searchUserName,
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                }}>
                {el.first_name} {el.last_name}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setAddedMembers(prevState => [...prevState, el]);
                setSearch('');
              }}
              style={{
                ...styles.addButton,
                backgroundColor: theme.colors.primary,
              }}>
              <Text
                style={{
                  ...styles.addText,
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.bold,
                }}>
                ADD
              </Text>
            </Pressable>
          </View>
        ) : undefined,
      )}

      <View style={{flexDirection: 'row'}}>
        {addedMembers.map(el => (
          <BattleMemberIcon key={el.email} photo={el.photo} />
        ))}
      </View>
      <Text
        style={{
          ...styles.title,
          fontFamily: theme.fonts.bold,
          color: theme.colors.textPrimary,
        }}>
        Select start and end dates
      </Text>
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

      <Pressable
        onPress={() => handleCreate()}
        style={{
          ...styles.createButton,
          backgroundColor: theme.colors.primary,
        }}>
        <Text
          style={{
            ...styles.createText,
            color: theme.colors.lightest,
            fontFamily: theme.fonts.bold,
          }}>
          CREATE
        </Text>
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