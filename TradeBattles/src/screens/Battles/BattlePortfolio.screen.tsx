import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {PortfolioStockCard} from '../../components/Stocks/PortfolioStockCard.component';
import {PortfolioStock} from '../../shared/Types';
import {ApiClient} from '../../services/ApiClient.service';
import {BattlePortfolioHeader} from '../../components/Battles/BattlePortfolioHeader.component';
import {GoBack} from '../../components/Misc/GoBack.component';
import type {RootStackParamList} from '../../shared/Types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PortfolioInitializer} from '../../shared/EmptyInitializers';
import {StockSearch} from '../../components/Stocks/StockSearch.component';
import LottieView from 'lottie-react-native';
import {useTheme} from '../../Contexts/Theme';
import {styles} from './BattlePortfolio.styles';
const spinnerSrc = require('../../../assets/lotties/spinner.json');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const BattlePortfolio: React.FC = () => {
  const {theme} = useTheme();

  const [currentUserPortfolio, setCurrentUserPortfolio] =
    useState<PortfolioStock[]>(PortfolioInitializer);

  const route = useRoute<RouteProp<RootStackParamList, 'BattlePortfolio'>>();

  const {battle, userId} = route.params;
  const battleHasStarted = Number(battle.start_date) < Date.now();
  const startDate = battle.start_date.substring(0, 10);
  const endDate = battle.end_date.substring(0, 10);
  const [nonLockedGainLoss, setNonLockedGainLoss] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  let profit: number;

  console.log(battle);

  const setPortfolio = async () => {
    setNonLockedGainLoss(0);
    const portfolio: PortfolioStock[] = [];
    const portfolioArray = await ApiClient.getUserPortfolio(userId, battle.id);

    profit = 0;
    await Promise.all(
      portfolioArray.data.map(async el => {
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
    setCurrentUserPortfolio(portfolio);
    setNonLockedGainLoss(prevstate => (prevstate += profit));
  };

  useEffect(() => {
    setPortfolio();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ApiClient.updateUserProfit(userId, profit, battle.id);
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
    <View style={{flex: 1, backgroundColor: theme.colors.backgroundColor}}>
      <GoBack />
      <View style={{alignSelf: 'center'}}>
        {battleHasStarted ? (
          <Text
            style={{
              fontFamily: theme.fonts.regular,
              fontSize: 12,
              color: theme.colors.textPrimary,
            }}>
            Battle ends on {endDate.split('GMT')[0]}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: theme.fonts.regular,
              fontSize: 12,
              color: theme.colors.textPrimary,
            }}>
            Battle starts on {startDate.split('GMT')[0]}
          </Text>
        )}
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
          padding: 10,
        }}>
        {refreshing ? (
          <View style={styles.portfolio_header_container} />
        ) : (
          <BattlePortfolioHeader
            battle={battle}
            userId={userId}
            currentGainLoss={nonLockedGainLoss}
          />
        )}

        <StockSearch
          battleId={battle.id}
          userId={userId}
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
                  battleId={battle.id}
                  userId={userId}
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
