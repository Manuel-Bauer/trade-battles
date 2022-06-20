import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../shared/Types';
import {useState} from 'react';
import {useEffect} from 'react';
import {ApiClient} from '../../services/ApiClient.service';
import {StockDetailsInfo} from '../../components/Stocks/StockDetailsInfo.component';
import {StockDetailsBuySell} from '../../components/Stocks/StockDetailsBuySell.component';
import {GoBack} from '../../components/GoBack.component';
import {WishlistStarIcon} from '../../components/WishlistStarIcon.component';
import {useTheme} from '../../Contexts/Theme';
import {styles} from './StockDetails.styles';

export const StockDetails: React.FC = () => {
  const {theme} = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const {
    stock,
    shares_owned,
    average_cost,
    battle_id,
    user_id,
    setCurrentUserPortfolio,
    currentUserPortfolio,
  } = route.params;

  const [quantityAvailable, setQuantityAvailable] = useState(shares_owned);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [price, setPrice] = useState(
    stock.isUSMarketOpen ? stock.iexRealtimePrice : stock.close,
  );
  const [dayChange, setDayChange] = useState(stock.changePercent);
  const [ytdChange, setYtdChange] = useState(stock.ytdChange);
  const [buySellViewable, setBuySellViewable] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      await ApiClient.getQuote(stock.symbol).then(res => {
        setPrice(res.data.iexRealtimePrice);
        setDayChange(res.data.changePercent);
        setYtdChange(res.data.ytdChange);
      });
    };
    fetchPrice();
    setInterval(() => fetchPrice(), 300000);
    //set to 5 minute interval
    //used 1% of my api credits in 5 minutes at 1 second interval
  }, []);

  return (
    <View
      style={{backgroundColor: theme.colors.backgroundColor, height: '100%'}}>
      <GoBack />
      <View style={styles.watchlistStar}>
        <WishlistStarIcon user_id={user_id} stock={stock} />
      </View>
      <View style={styles.container}>
        <StockDetailsInfo
          stock={stock}
          price={price == null ? 0 : price}
          dayChange={dayChange}
          ytdChange={ytdChange}
        />

        <Pressable
          onPress={() => setBuySellViewable(!buySellViewable)}
          style={{
            ...styles.tradeButton,
            backgroundColor: theme.colors.primary,
          }}>
          <Text
            style={{
              ...styles.tradeButtonText,
              color: theme.colors.lightest,
              fontFamily: theme.fonts.bold,
            }}>
            Trade
          </Text>
        </Pressable>

        <Text
          style={{
            ...styles.averageCostText,
            fontFamily: theme.fonts.regular,
          }}>
          Your average cost per share: ${average_cost.toFixed(2)}
        </Text>

        <StockDetailsBuySell
          setQuantitySelected={setQuantitySelected}
          quantitySelected={quantitySelected}
          setQuantityAvailable={setQuantityAvailable}
          quantityAvailable={quantityAvailable}
          setBuySellViewable={setBuySellViewable}
          buySellViewable={buySellViewable}
          price={price == null ? 0 : price}
          stock={stock}
          battle_id={battle_id}
          user_id={user_id}
          setCurrentUserPortfolio={setCurrentUserPortfolio}
          currentUserPortfolio={currentUserPortfolio}
        />
      </View>
    </View>
  );
};
