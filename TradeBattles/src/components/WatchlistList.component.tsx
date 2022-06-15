import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Stock} from '../shared/Types';
import {StockInitializer} from '../shared/EmptyInitializers';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {WatchlistStockCard} from './WatchlistStockCard.component';
import {WatchlistIcon} from './BottomTabIcons.component';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const WatchlistList = () => {
  const userContext = useUserContext();

  const [watchlist, setWatchlist] = useState<Stock[]>([StockInitializer]);
  const [refreshing, setRefreshing] = useState(false);
  const getWatchlistArray = () => {
    const array = ApiClient.getUserById(userContext.user.id).then(res => {
      // console.warn(res.data[0].watchlist, 'list component');
      return res.data[0].watchlist;
    });
    return array;
  };

  const fetchWatchlistStocks = async () => {
    let watchlistStocks: Stock[] = [];
    const array = await getWatchlistArray();
    await Promise.all(
      array.map(async el => {
        const response = await ApiClient.getQuote(el.toLowerCase());
        watchlistStocks.push(response.data);
      }),
    );
    // console.warn(watchlistStocks, 'array');
    watchlistStocks.sort(
      (a, b) => a.symbol.charCodeAt(0) - b.symbol.charCodeAt(0),
    );
    setWatchlist(watchlistStocks);
  };

  useEffect(() => {
    fetchWatchlistStocks();
  }, []);

  // useEffect(() => {
  //   console.warn(watchlist.map(el => el.symbol));
  // }, [watchlist]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(700).then(() => {
      fetchWatchlistStocks(), setRefreshing(false);
    });
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{width: '100%'}}
      showsVerticalScrollIndicator={false}
      data={watchlist}
      renderItem={({item}: {item: Stock}) => (
        <WatchlistStockCard stock={item} />
      )}
    />
  );
};
