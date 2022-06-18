import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import {useTheme} from '../../Contexts/Theme';
import {ApiClient} from '../../services/ApiClient.service';
import {StockInitializer} from '../../shared/EmptyInitializers';
import {Stock} from '../../shared/Types';
import {styles} from './StockSearch.styles';

export interface IStockSearchResultProps {
  item: {ticker: string; name: string};
}

const StockSearchResult: React.FunctionComponent<IStockSearchResultProps> = ({
  item,
}) => {
  const {theme} = useTheme();
  return (
    <Pressable
      onPress={() => {
        setSearch('');
        let stock: Stock = StockInitializer;

        ApiClient.getQuote(item.ticker).then(res => {
          (stock = res.data),
            navigation.navigate('BuySellStock', {
              stock: stock,
              shares_owned: 0, // TODO -> Refactor to be dynamic with api call
              average_cost: 0, // TODO -> Refactor to be dynamic with api call
              battle_id,
              user_id,
              currentUserPortfolio,
              setCurrentUserPortfolio,
            });
        });
      }}
      style={{
        ...styles.resultCardContainer,
        borderBottomColor: theme.colors.light,
        backgroundColor: theme.colors.backgroundColor,
      }}>
      <Image
        style={styles.logo}
        source={{
          uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${item.ticker}.png`,
        }}
      />
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.regular,
        }}>
        {item.name.length > textLengthLimit
          ? item.name.substring(0, textLengthLimit - 3) + ' ...'
          : item.name}
      </Text>
    </Pressable>
  );
};

export default StockSearchResult;
