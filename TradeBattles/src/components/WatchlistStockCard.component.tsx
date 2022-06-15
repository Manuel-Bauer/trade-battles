import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {useUserContext} from '../App.provider';
import {formatter} from '../shared/Methods';
import {theme} from '../shared/themes';
import {Stock} from '../shared/Types';
import {WishlistStarIcon} from './WishlistStarIcon.component';
const spinnerSrc = require('../../assets/lotties/spinner.json');

export const WatchlistStockCard: React.FC<{stock: Stock}> = ({stock}) => {
  const [viewable, setViewable] = useState(true);
  const [style, setStyle] = useState([styles.container, {}]);
  const userContext = useUserContext();
  const return_color_day_change =
    stock.change > 0 ? theme.primary_green : theme.primary_red;

  useEffect(() => {
    if (viewable === false) {
      setStyle([styles.container, {display: 'none'}]);
    }
  }, [viewable]);

  useEffect(() => {
    console.warn(stock.symbol);
  }, [stock]);

  return (
    <View style={style}>
      {stock.companyName ? (
        <View style={styles.stock_card_container}>
          <Image
            style={styles.logo}
            source={{
              uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
            }}
          />
          <Text style={styles.ticker}>{stock.symbol}</Text>
          <View
            style={[
              styles.return_container,
              {backgroundColor: return_color_day_change},
            ]}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 12}}>
              {(stock.changePercent * 100).toFixed(2)}%
            </Text>
          </View>
          <Text style={{fontWeight: '600', color: theme.colorPrimary}}>
            {formatter.format(
              stock.iexRealtimePrice
                ? stock.iexRealtimePrice
                : stock.latestPrice,
            )}
          </Text>
          <WishlistStarIcon
            user_id={userContext.user.id}
            size={20}
            stock={stock}
            // setViewable={setViewable}
            defaultYellow={true}
          />
        </View>
      ) : (
        <View
          style={{
            width: 90,
            height: 90,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 115,
          }}>
          <LottieView source={spinnerSrc} autoPlay loop={false} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
  },
  stock_card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: theme.colorPrimary,
    borderBottomWidth: 0.3,
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  ticker: {
    color: theme.colorPrimary,
    fontWeight: '400',
    fontFamily: theme.fontFamilyLight,
  },
  return_container: {
    padding: 4,
    borderRadius: 5,
  },
});
