import React, {Dispatch, SetStateAction} from 'react';
import {View, Pressable, Text, Image} from 'react-native';
import {useTheme} from '../../Contexts/Theme';
import {User} from '../../shared/Types';
import {styles} from './AddUserCard.styles';

export interface IAddUserCardProps {
  user: User;
  setAddedMembers: Dispatch<SetStateAction<User[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

const AddUserCard: React.FunctionComponent<IAddUserCardProps> = ({
  user,
  setAddedMembers,
  setSearch,
}) => {
  const {theme, darkMode} = useTheme();
  return (
    <View
      key={user.id}
      style={{
        ...styles.searchItemWithButtonContainer,
        borderBottomColor: darkMode ? theme.colors.dark : theme.colors.lighter,
      }}>
      <View style={styles.searchItemContainer}>
        <Image style={styles.searchPhoto} source={{uri: user.photo}} />
        <Text
          style={{
            ...styles.searchUserName,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.bold,
          }}>
          {user.givenName} {user.familyName}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          setAddedMembers(prevState => [...prevState, user]);
          setSearch('');
        }}
        style={{
          ...styles.addButton,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lighter,
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
  );
};

export default AddUserCard;
