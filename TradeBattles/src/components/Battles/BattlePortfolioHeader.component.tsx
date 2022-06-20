import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Battle} from '../../shared/Types';
import {formatter} from '../../shared/Methods';
import LottieView from 'lottie-react-native';
import {styles} from './BattlePortfolioHeader.styles';
import {useTheme} from '../../Contexts/Theme';
const spinnerSrc = require('../../../assets/lotties/spinner.json');

export const BattlePortfolioHeader: React.FC<{
  battle: Battle;
  currentGainLoss: number;
}> = ({battle, currentGainLoss}) => {
  const {theme, darkMode} = useTheme();
  const [wait, setWait] = useState(false);

  useEffect(() => {
    setTimeout(() => setWait(true), 1500);
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
              {formatter.format(100000 + currentGainLoss)}
            </Text>
            <View
              style={[styles.returnContainer, {backgroundColor: returnColor}]}>
              <Text
                style={{
                  color: theme.colors.lightest,
                }}>
                {((currentGainLoss / 100000) * 100).toFixed(2)}%
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
            {/* {formatter.format(Math.random() * 30000)} */}
            $35,742.20
          </Text>
        </View>
      </View>
    </View>
  );
};
