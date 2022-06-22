import React, {useEffect, useState} from 'react';
import {Pressable, Image, View} from 'react-native';
import {ApiClient} from '../../services/ApiClient.service';
import {Stock} from '../../shared/Types';
import {CustomModal} from '../Misc/CustomModal';
const greyStarSrc = require('../../../assets/icons/star_grey_icon.png');
const yellowStarSrc = require('../../../assets/icons/star_yellow_icon.png');

export const WishlistStarIcon: React.FC<{
  userId: string;
  stock: Stock;
  size?: number;
  setViewable?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultYellow?: boolean;
}> = ({userId, stock, size, setViewable, defaultYellow}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(defaultYellow);
  const [watchistModal, setWatchlistModal] = useState(false);

  const getUser = async (userId: string, symbol: string) => {
    const user = await ApiClient.getUserById(userId);
    user.data[0].watchlist.includes(symbol) && setIsInWatchlist(true);
    return user.data[0].watchlist;
  };

  useEffect(() => {
    getUser(userId, stock.symbol);
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => {
          ApiClient.updateUserWatchlist(userId, stock.symbol);
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
