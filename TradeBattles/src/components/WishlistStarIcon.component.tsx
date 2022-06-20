import React, {useEffect, useState} from 'react';
import {Pressable, Image, View} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {Stock} from '../shared/Types';
import {CustomModal} from './CustomModal';
const greyStarSrc = require('../../assets/icons/star_grey_icon.png');
const yellowStarSrc = require('../../assets/icons/star_yellow_icon.png');

export const WishlistStarIcon: React.FC<{
  user_id: string;
  stock: Stock;
  size?: number;
  setViewable?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultYellow?: boolean;
}> = ({user_id, stock, size, setViewable, defaultYellow}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(defaultYellow);
  const [watchistModal, setWatchlistModal] = useState(false);

  const getUser = async (user_id: string, symbol: string) => {
    const user = await ApiClient.getUserById(user_id);
    user.data[0].watchlist.includes(symbol) && setIsInWatchlist(true);
    return user.data[0].watchlist;
  };

  useEffect(() => {
    getUser(user_id, stock.symbol);
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => {
          ApiClient.updateUserWatchlist(user_id, stock.symbol);
          setWatchlistModal(true);
          setIsInWatchlist(!isInWatchlist);
          setViewable && setViewable(false);
        }}>
        <Image
          style={{width: size || 35, height: size || 35}}
          source={isInWatchlist ? yellowStarSrc : greyStarSrc}
        />
      </Pressable>
      <CustomModal
        text={
          isInWatchlist
            ? 'Success! Added to watchlist'
            : 'Success! Removed from watchlist'
        }
        viewable={watchistModal}
        setViewable={setWatchlistModal}
      />
    </View>
  );
};
