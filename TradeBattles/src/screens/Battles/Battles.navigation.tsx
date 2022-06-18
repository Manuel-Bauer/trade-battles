import React from 'react';
import {RootStackParamList} from '../../shared/Types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../BattlePortfolio.screen';
import {StockDetails} from '../StockDetails.screen';
import {Battles} from './Battles.screen';
import {CreateBattle} from './CreateBattle.screen';

/* ---- CONTEXT ---- */
import {useTheme} from '../../Contexts/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const BattlesNavigation = () => {
  const {theme} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: theme.colors.backgroundColor},
        headerShown: false,
      }}>
      <Stack.Screen name={'MyBattles'} component={Battles} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={StockDetails} />
      <Stack.Screen name={'CreateBattle'} component={CreateBattle} />
    </Stack.Navigator>
  );
};
