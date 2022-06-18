import React, {useEffect} from 'react';

/* ---- NAVIGATION ---- */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsNavigator} from '../BottomTabs.navigaton';
import {useNavigation} from '@react-navigation/native';

/* ---- COMPONENTS ---- */
import {LoginOnlySocial} from './LoginOnlySocial.screen';

/* ---- CONTEXTS ---- */
import {useAuth} from '../../Contexts/Auth';
import {useTheme} from '../../Contexts/Theme';

/* ---- TYPES ---- */
import {LoginScreenNavigationProp} from '../../shared/Types';
import {LoginStackParamList} from '../../shared/Types';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const Navigation: React.FC = () => {
  const {currentUser} = useAuth();
  const {theme} = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    navigation.navigate('Home');
  }, [navigation, currentUser]);

  return (
    <Stack.Navigator
      initialRouteName="LoginOnlySocial"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: theme.colors.backgroundColor},
      }}>
      {currentUser.id === 'DEFAULT' ? (
        <Stack.Screen name={'LoginOnlySocial'} component={LoginOnlySocial} />
      ) : (
        <Stack.Screen name={'Home'} component={BottomTabsNavigator} />
      )}
    </Stack.Navigator>
  );
};
