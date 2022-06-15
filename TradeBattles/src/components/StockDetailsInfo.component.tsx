import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {GraphPoint, Stock} from '../shared/Types';
import {theme} from '../shared/themes';
import LottieView from 'lottie-react-native';
const {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} = require('@rainbow-me/animated-charts');
import {ApiClient} from '../services/ApiClient.service';
const spinnerSrc = require('../../assets/lotties/spinner.json');

const SCREEN_WIDTH = Dimensions.get('window').width;
export const StockDetailsInfo: React.FC<{
  stock: Stock;
  price: number;
  dayChange: number;
  ytdChange: number;
}> = ({stock, price, dayChange, ytdChange}) => {
  price =
    price > 0
      ? price
      : stock.iexRealtimePrice
      ? stock.iexRealtimePrice
      : stock.latestPrice;
  const [graphPoints, setGraphPoints] = useState<GraphPoint[]>([
    {vw: -1, t: 0},
  ]);

  const [oneYearSelected, setOneYearSelected] = useState(true);
  const [twoYearsSelected, setTwoYearsSelected] = useState(false);

  function subtractYears(numOfYears: number, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
  }
  const getHistoricals = async (timespan: number) => {
    const now = new Date();
    const oneYear = subtractYears(timespan);
    await ApiClient.getHistoricalData(
      stock.symbol,
      'day',
      timespan,
      oneYear.getTime(),
      now.getTime(),
    ).then(res => setGraphPoints(res.data.results));
  };

  useEffect(() => {
    getHistoricals(1);
  }, []);

  const formatCurrency = (value: any) => {
    'worklet';
    if (value === '') {
      return `$${price.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const return_color_day_change =
    dayChange > 0 ? theme.primary_green : theme.primary_red;
  const return_color_ytd_change =
    ytdChange > 0 ? theme.primary_green : theme.primary_red;
  const return_color_graph =
    price > graphPoints[0].vw ? theme.primary_green : theme.primary_red;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
      }}>
      <ChartPathProvider
        data={{
          points: graphPoints.map((point, index) => ({
            x: point.t,
            y: point.vw,
          })),
          smoothingStrategy: 'bezier',
          smoothingFactor: 0,
        }}>
        <View>
          <View style={styles.logo_ticker_header}>
            <Image
              style={[styles.logo, {resizeMode: 'contain'}]}
              source={{
                uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
              }}
            />
            <Text style={styles.title}>{stock.symbol}</Text>
          </View>
        </View>

        <View>
          <ChartYLabel format={formatCurrency} style={styles.price} />
        </View>

        <View style={styles.changes_row}>
          <View style={styles.change_container}>
            <Text style={styles.change_text}>Day Change</Text>
            <View
              style={{
                borderRadius: 10,
                padding: 5,
                backgroundColor: return_color_day_change,
              }}>
              <Text style={{color: 'white', fontWeight: '700'}}>
                {(dayChange * 100).toFixed(2)}%
              </Text>
            </View>
          </View>
          <View style={styles.change_container}>
            <Text style={styles.change_text}>YTD Change</Text>
            <View
              style={{
                borderRadius: 10,
                padding: 5,
                backgroundColor: return_color_ytd_change,
              }}>
              <Text style={{color: 'white', fontWeight: '700'}}>
                {(ytdChange * 100).toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        <View>
          {graphPoints[0].vw > -1 ? (
            <ChartPath
              height={SCREEN_WIDTH / 2}
              stroke={return_color_graph}
              strokeWidth={1}
              width={SCREEN_WIDTH}
            />
          ) : (
            <View style={{alignSelf: 'center'}}>
              <View style={{width: 200, height: 200, padding: -10}}>
                <LottieView source={spinnerSrc} autoPlay loop={false} />
              </View>
            </View>
          )}
          <ChartDot
            style={{
              backgroundColor: return_color_graph,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: -20,
          }}>
          <Pressable
            style={[
              styles.date_button,
              {
                backgroundColor: oneYearSelected
                  ? theme.colorPrimary
                  : theme.greyPrimary,
              },
            ]}
            onPress={() => {
              getHistoricals(1),
                setTwoYearsSelected(false),
                setOneYearSelected(true);
            }}>
            <Text
              style={[
                styles.date_text,
                {
                  color: oneYearSelected
                    ? theme.light_mode_white
                    : theme.colorPrimary,
                },
              ]}>
              1Y
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.date_button,
              {
                backgroundColor: twoYearsSelected
                  ? theme.colorPrimary
                  : theme.greyPrimary,
              },
            ]}
            onPress={() => {
              getHistoricals(2),
                setOneYearSelected(false),
                setTwoYearsSelected(true);
            }}>
            <Text
              style={[
                styles.date_text,
                {
                  color: twoYearsSelected
                    ? theme.light_mode_white
                    : theme.colorPrimary,
                },
              ]}>
              2Y
            </Text>
          </Pressable>
        </View>
      </ChartPathProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '800',
    marginLeft: 12,
    color: theme.colorPrimary,
    fontFamily: theme.fontFamilyBold,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  price: {
    fontSize: 45,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
    color: theme.colorPrimary,
  },
  change_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 12,
  },
  change_text: {
    fontSize: 15,
    marginBottom: 6,
    fontFamily: theme.fontFamilyRegular,
  },
  logo_ticker_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  changes_row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  date_button: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
  },
  date_text: {
    fontFamily: theme.fontFamilyBold,
  },
});
