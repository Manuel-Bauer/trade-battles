import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import {GraphPoint, Stock} from '../../shared/Types';
import LottieView from 'lottie-react-native';
const {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} = require('@rainbow-me/animated-charts');
import {ApiClient} from '../../services/ApiClient.service';
import {useTheme} from '../../Contexts/Theme';
import {styles} from './StockDetailsInfo.styles';
const spinnerSrc = require('../../../assets/lotties/spinner.json');

const SCREEN_WIDTH = Dimensions.get('window').width;
export const StockDetailsInfo: React.FC<{
  stock: Stock;
  price: number;
  dayChange: number;
  ytdChange: number;
}> = ({stock, price, dayChange, ytdChange}) => {
  const {theme} = useTheme();
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
    dayChange > 0 ? theme.colors.green : theme.colors.red;
  const return_color_ytd_change =
    ytdChange > 0 ? theme.colors.green : theme.colors.red;
  const return_color_graph =
    price > graphPoints[0].vw ? theme.colors.green : theme.colors.red;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
      }}>
      <ChartPathProvider
        data={{
          points: graphPoints.map(point => ({
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
            <Text
              style={{
                ...styles.title,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.bold,
              }}>
              {stock.symbol}
            </Text>
          </View>
        </View>

        <View>
          <ChartYLabel
            format={formatCurrency}
            style={{...styles.price, color: theme.colors.textPrimary}}
          />
        </View>

        <View style={styles.changes_row}>
          <View style={styles.change_container}>
            <Text
              style={{
                ...styles.change_text,
                color: theme.colors.textSecondary,
              }}>
              Day Change
            </Text>
            <View
              style={{
                ...styles.changePill,
                backgroundColor: return_color_day_change,
              }}>
              <Text style={styles.changeText}>
                {(dayChange * 100).toFixed(2)}%
              </Text>
            </View>
          </View>
          <View style={styles.change_container}>
            <Text
              style={{
                ...styles.change_text,
                color: theme.colors.textSecondary,
              }}>
              YTD Change
            </Text>
            <View
              style={{
                ...styles.changePill,
                backgroundColor: return_color_ytd_change,
              }}>
              <Text style={styles.changeText}>
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
        <View style={styles.durationButtonContainer}>
          <Pressable
            style={{
              ...styles.date_button,
              backgroundColor: theme.colors.primary,
              opacity: oneYearSelected ? 1 : 0.5,
            }}
            onPress={() => {
              getHistoricals(1);
              setOneYearSelected(true);
            }}>
            <Text
              style={{
                color: theme.colors.lightest,
              }}>
              1Y
            </Text>
          </Pressable>
          <Pressable
            style={{
              ...styles.date_button,
              backgroundColor: theme.colors.primary,
              opacity: oneYearSelected ? 0.5 : 1,
            }}
            onPress={() => {
              getHistoricals(2);
              setOneYearSelected(false);
            }}>
            <Text
              style={[
                {
                  color: theme.colors.lightest,
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
