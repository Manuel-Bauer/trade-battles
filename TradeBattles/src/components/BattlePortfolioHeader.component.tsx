import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
import {Battle} from '../shared/Types';
import {formatter} from '../shared/Methods';
import LottieView from 'lottie-react-native';
const spinnerSrc = require('../../assets/lotties/spinner.json');

export const BattlePortfolioHeader: React.FC<{
  battle: Battle;
  currentGainLoss: number;
}> = ({battle, currentGainLoss}) => {
  const [wait, setWait] = useState(false);

  useEffect(() => {
    setTimeout(() => setWait(true), 1500);
  }, []);

  const returnColor =
    currentGainLoss > 0 ? theme.primary_green : theme.primary_red;
  return (
    <View style={styles.container}>
      <View style={styles.portfolio_header_container}>
        <Text style={styles.title}>{battle.battle_name}</Text>
        {wait ? (
          <View style={styles.total_value_container}>
            <Text style={styles.portfolio_value}>
              {formatter.format(100000 + currentGainLoss)}
            </Text>
            <View
              style={[styles.return_container, {backgroundColor: returnColor}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: '400',
              marginRight: 10,
              fontFamily: theme.fontFamilyLight,
            }}>
            Capital available:
          </Text>
          <Text style={styles.capital_available}>
            {/* {formatter.format(Math.random() * 30000)} */}
            $35,742.20
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  portfolio_header_container: {
    backgroundColor: theme.greyPrimary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    color: theme.colorPrimary,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 30,
    fontFamily: theme.fontFamilyLight,
    marginBottom: 10,
    fontWeight: '200',
    color: theme.colorPrimary,
  },

  portfolio_value: {
    fontWeight: '700',
    fontSize: 32,
    color: theme.colorPrimary,
    marginRight: 10,
  },
  return_container: {
    padding: 5,
    borderRadius: 7,
  },
  capital_available: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colorPrimary,
  },
  total_value_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
