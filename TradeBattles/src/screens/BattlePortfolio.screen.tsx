import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattlePortfolioHeader} from '../components/BattlePortfolioHeader.component';
import {GoBack} from '../components/GoBack.component';
import type {RootStackParamList} from '../shared/Types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PortfolioInitializer} from '../shared/EmptyInitializers';
import {StockSearch} from '../components/StockSearch.component';
import LottieView from 'lottie-react-native';
const spinnerSrc = require('../../assets/lotties/spinner.json');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] =
    useState<PortfolioStock[]>(PortfolioInitializer);

  const route = useRoute<RouteProp<RootStackParamList, 'BattlePortfolio'>>();

  const {battle, user_id} = route.params;
  const battleHasStarted = Number(battle.start_date_timestamp) < Date.now();
  const startDate = new Date(Number(battle.start_date_timestamp)).toString();
  const endDate = new Date(Number(battle.end_date_timestamp)).toString();
  const [nonLockedGainLoss, setNonLockedGainLoss] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  let profit: number;

  const setPortfolio = async () => {
    setNonLockedGainLoss(0);
    const portfolio: PortfolioStock[] = [];
    const portfolioArray = await ApiClient.getUserPortfolio(
      user_id,
      battle.battle_id,
    );
    console.log('getUserPortfolio: portfolioArray.data', portfolioArray.data);

    // console.warn(portfolioArray);
    profit = 0;
    await Promise.all(
      portfolioArray.data.map(async el => {
        // console.warn(el.symbol);
        const quote = await ApiClient.getQuote(el.symbol);
        console.log('getQuote', quote);
        el.price = quote.data.close ? quote.data.close : quote.data.latestPrice;
        el.change = ((el.price - el.averageCost) / el.averageCost) * 100;
        el.quote = quote.data;
        profit += (el.price - el.averageCost) * el.quantity;
        el.quantity > 0 && portfolio.push(el);
      }),
    );
    portfolio.sort((a, b) => a.symbol.charCodeAt(0) - b.symbol.charCodeAt(0));
    console.log('portfolio', portfolio);
    // console.warn(portfolio.map(el => el.symbol));
    setCurrentUserPortfolio(portfolio);
    setNonLockedGainLoss(prevstate => (prevstate += profit));
  };

  useEffect(() => {
    setPortfolio();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ApiClient.updateUserProfit(user_id, profit, battle.battle_id);
    }, 3000);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setPortfolio();
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <GoBack />
      <View style={{alignSelf: 'center'}}>
        {battleHasStarted ? (
          <Text
            style={{
              fontFamily: theme.fontFamilyRegular,
              fontSize: 12,
              color: theme.colorPrimary,
            }}>
            Battle ends on {endDate.split('GMT')[0]}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: theme.fontFamilyRegular,
              fontSize: 12,
              color: theme.colorPrimary,
            }}>
            Battle starts on {startDate.split('GMT')[0]}
          </Text>
        )}
      </View>

      <View
        style={{flex: 1, backgroundColor: theme.light_mode_white, padding: 10}}>
        {refreshing ? (
          <View style={styles.portfolio_header_container} />
        ) : (
          <BattlePortfolioHeader
            battle={battle}
            currentGainLoss={nonLockedGainLoss}
          />
        )}

        <StockSearch
          battle_id={battle.battle_id}
          user_id={user_id}
          currentUserPortfolio={currentUserPortfolio}
          setCurrentUserPortfolio={setCurrentUserPortfolio}
        />

        {currentUserPortfolio?.[0]?.price === 0 ? (
          <View
            style={{
              width: 140,
              height: 140,
              padding: -10,
              alignSelf: 'center',
            }}>
            <LottieView source={spinnerSrc} autoPlay loop={false} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              data={currentUserPortfolio}
              renderItem={({item}: {item: PortfolioStock}) => (
                <PortfolioStockCard
                  battleid={battle.battle_id}
                  userid={user_id}
                  stock={item}
                  currentUserPortfolio={currentUserPortfolio}
                  setCurrentUserPortfolio={setCurrentUserPortfolio}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  portfolio_header_container: {
    alignSelf: 'center',
    backgroundColor: theme.greyPrimary,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    height: 150,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
});
