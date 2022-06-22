import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Battle, Portfolio} from '../../shared/Types';
import {formatter} from '../../shared/utils';
import LottieView from 'lottie-react-native';
import {styles} from './BattlePortfolioHeader.styles';
import {useTheme} from '../../Contexts/Theme';
import {PortfolioInitializer} from '../../shared/EmptyInitializers';
const spinnerSrc = require('../../../assets/lotties/spinner.json');

export const BattlePortfolioHeader: React.FC<{
  battle: Battle;
  userId: String;
  currentGainLoss: number;
}> = ({battle, userId, currentGainLoss}) => {
  const {theme, darkMode} = useTheme();
  const [wait, setWait] = useState(false);
  const [loss, setLoss] = useState(0);
  const [userPortfolio, setUserPortfolio] = useState<Portfolio[]>([
    PortfolioInitializer,
  ]);

  useEffect(() => {
    setTimeout(() => setWait(true), 1500);
  }, []);

  useEffect(() => {
    const selectedUser = battle.users.filter(el => Number(userId) === el.id);
    console.log(battle.users);
    setUserPortfolio(selectedUser);
  }, []);

  useEffect(() => {
    const totalLoss = (
      (Number(battle.budget) - userPortfolio[0].remainingBudget) *
      100
    ).toFixed(2);
    setLoss(Number(totalLoss));
  }, []);

  const returnColor =
    currentGainLoss > 0 ? theme.colors.green : theme.colors.red;
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.portfolioHeaderContainer,
          backgroundColor: darkMode ? theme.colors.dark : theme.colors.lightest,
        }}>
        <Text
          style={{
            ...styles.title,
            fontFamily: theme.fonts.light,
            color: theme.colors.textPrimary,
          }}>
          {battle.battle_name}
        </Text>
        {wait ? (
          <View style={styles.totalValueContainer}>
            <Text
              style={{
                ...styles.portfolioValue,
                fontFamily: theme.fonts.bold,
                color: theme.colors.textPrimary,
              }}>
                   {formatter.format(userPortfolio[0].currentValue)}
            </Text>
            <View
              style={[styles.returnContainer, {backgroundColor: returnColor}]}>
              <Text
                style={{
                  color: theme.colors.lightest,
                }}>
                {loss}%
              </Text>
            </View>
          </View>
        ) : (
          <View style={{width: 90, height: 90, padding: -10}}>
            <LottieView source={spinnerSrc} autoPlay loop={false} />
          </View>
        )}
        <View style={styles.capitalAvailableContainer}>
          <Text
            style={{
              marginRight: 10,
              fontFamily: theme.fonts.regular,
              color: theme.colors.textPrimary,
            }}>
            Capital available:
          </Text>
          <Text
            style={{
              ...styles.capitalAvailable,
              fontFamily: theme.fonts.light,
              color: theme.colors.textPrimary,
            }}>
            {formatter.format(userPortfolio[0].remainingBudget)}
          </Text>
        </View>
      </View>
    </View>
  );
};
