import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsNavigator} from './BottomTabs.navigaton';
import {LoginStackParamList} from '../shared/Types';
import {LoginOnlySocial} from './LoginOnlySocial.screen';
import {useUserContext} from '../App.provider';
import {LoginScreenNavigationProp} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../shared/themes';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const Navigation: React.FC = () => {
  const userContext = useUserContext();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    navigation.navigate('Home');
  }, [userContext]);

  return (
    <Stack.Navigator
      initialRouteName="LoginOnlySocial"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.stockCardBackground},
      }}>
      {userContext.user.id === 'DEFAULT' ? (
        <Stack.Screen name={'LoginOnlySocial'} component={LoginOnlySocial} />
      ) : (
        <Stack.Screen name={'Home'} component={BottomTabsNavigator} />
      )}
    </Stack.Navigator>
  );
};
