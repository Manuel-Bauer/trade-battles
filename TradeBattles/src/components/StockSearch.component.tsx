import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import {PortfolioStock, Stock} from '../shared/Types';
import {stockListForSearch} from '../stockListForSearch';
import {StockInitializer} from '../shared/EmptyInitializers';
import {ApiClient} from '../services/ApiClient.service';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../shared/themes';
import {CustomModal} from './CustomModal';

const SEARCH_TERM_WIDTH = Dimensions.get('window').width * 0.8;
export const StockSearch: React.FC<{
  battle_id: string;
  user_id: string;
  currentUserPortfolio: PortfolioStock[];
  setCurrentUserPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioStock[]>
  >;
}> = ({battle_id, user_id, currentUserPortfolio, setCurrentUserPortfolio}) => {
  const [search, setSearch] = useState('');
  const [badSearch, setBadSearch] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const handleSearch = (currentSearch: string) => {
    setSearch(currentSearch);
  };
  const textLengthLimit = 35;
  return (
    <>
      <CustomModal
        text={`'${search}' ticker not found. Try searching for another stock ticker.`}
        viewable={badSearch}
        setViewable={setBadSearch}
      />
      <View style={styles.container}>
        <TextInput
          onChangeText={currentSearch => handleSearch(currentSearch)}
          style={styles.input}
          placeholder="Search stock market..."
          placeholderTextColor={theme.colorPrimary}
          value={search}
        />
        <Pressable
          style={styles.search_button}
          onPress={() => {
            let stock: Stock = StockInitializer;
            ApiClient.getQuote(search)
              .then(res => {
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
              })
              .catch(error => {
                setBadSearch(true);
              });
          }}>
          <Text
            style={{
              fontWeight: '800',
              color: theme.light_mode_white,
              fontFamily: theme.fontFamilyBold,
            }}>
            Search
          </Text>
        </Pressable>
      </View>
      <View style={{alignSelf: 'center'}}>
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
                        battle_id,
                        user_id,
                        currentUserPortfolio,
                        setCurrentUserPortfolio,
                      });
                  });
                }}
                style={styles.result_card_container}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${item.ticker}.png`,
                  }}
                />
                <Text style={styles.stock_company_name}>
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  input: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: theme.stockCardBackground,
    color: theme.colorPrimary,
    fontWeight: '400',
    fontFamily: theme.fontFamilyLight,
  },
  search_button: {
    backgroundColor: theme.colorPrimary,
    padding: 10,
    borderRadius: 7,
  },
  result_card_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: theme.colorPrimary,
    borderBottomWidth: 0.3,
    margin: 2,
    width: SEARCH_TERM_WIDTH,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.stockCardBackground,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  stock_company_name: {
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 5,
    color: theme.colorPrimary,
    fontFamily: theme.fontFamilyRegular,
  },
});
