import React from 'react';
import {RootStackParamList} from '../../shared/Types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../BattlePortfolio.screen';
import {StockDetails} from '../StockDetails.screen';
import {MyBattles} from './MyBattles.screen';
import {CreateBattle} from './CreateBattle.screen';

/* ---- CONTEXT ---- */
import {useTheme} from '../../Contexts/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Battles = () => {
  const {theme} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: theme.colors.backgroundColor},
        headerShown: false,
      }}>
      <Stack.Screen name={'MyBattles'} component={MyBattles} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={StockDetails} />
      <Stack.Screen name={'CreateBattle'} component={CreateBattle} />
    </Stack.Navigator>
  );
};
