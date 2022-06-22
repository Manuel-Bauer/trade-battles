import React, {useState} from 'react';
import {View, Text, Image, TextInput, Pressable} from 'react-native';
import {PortfolioStock, Stock} from '../../shared/Types';
import {stockListForSearch} from '../../stockListForSearch';
import {StockInitializer} from '../../shared/EmptyInitializers';
import {ApiClient} from '../../services/ApiClient.service';
import type {ProfileScreenNavigationProp} from '../../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {CustomModal} from '../Misc/CustomModal';
import {useTheme} from '../../Contexts/Theme';
import {styles} from './StockSearch.styles';

export const StockSearch: React.FC<{
  battleId: string;
  userId: string;
  currentUserPortfolio: PortfolioStock[];
  setCurrentUserPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioStock[]>
  >;
}> = ({battleId, userId, currentUserPortfolio, setCurrentUserPortfolio}) => {
  const {theme} = useTheme();

  const [search, setSearch] = useState('');
  const [badSearch, setBadSearch] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const textLengthLimit = 35;
  return (
    <>
      <CustomModal
        text={`'${search}' ticker not found. Try searching for another stock ticker.`}
        viewable={badSearch}
        setViewable={setBadSearch}
      />
      <View style={styles.container}>
        <View
          style={{
            ...styles.searchContainer,
            shadowColor: theme.colors.dark,
          }}>
          <TextInput
            onChangeText={value => setSearch(value)}
            style={{
              ...styles.input,
              backgroundColor: theme.colors.lightest,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.light,
            }}
            placeholder="Search stock market..."
            placeholderTextColor={theme.colors.dark}
            value={search}
          />
          <Pressable
            style={{
              ...styles.searchButton,
              backgroundColor: theme.colors.primary,
            }}
            onPress={() => {
              let stock: Stock = StockInitializer;
              ApiClient.getQuote(search)
                .then(res => {
                  (stock = res.data),
                    navigation.navigate('BuySellStock', {
                      stock: stock,
                      shares_owned: 0, // TODO -> Refactor to be dynamic with api call
                      average_cost: 0, // TODO -> Refactor to be dynamic with api call
                      battleId,
                      userId,
                      currentUserPortfolio,
                      setCurrentUserPortfolio,
                    });
                })
                .catch(() => {
                  setBadSearch(true);
                });
            }}>
            <Text
              style={{
                fontWeight: '800',
                color: theme.colors.lightest,
                fontFamily: theme.fonts.bold,
              }}>
              Search
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        {stockListForSearch
          .filter(item => {
            const lowercaseSearch = search.toLowerCase();
            const lowercaseTicker = item.ticker.toLowerCase();
            const lowercaseName = item.name.toLowerCase();

            return (
              lowercaseSearch &&
              (lowercaseTicker.startsWith(lowercaseSearch) ||
                lowercaseName.startsWith(lowercaseSearch))
            );
          })
          .slice(0, 10)
          .map(item => {
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
                        battleId,
                        userId,
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
          })}
      </View>
    </>
  );
};
