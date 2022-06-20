import React from 'react';
import {useState} from 'react';
import {View, Text, Pressable, Modal, Image} from 'react-native';
import {useTheme} from '../../Contexts/Theme';
import {ApiClient} from '../../services/ApiClient.service';
import {PurchaseOrderInitializer} from '../../shared/EmptyInitializers';
import {formatter} from '../../shared/Methods';
import {showNotification} from '../../shared/Notification';
import {BuySellProps} from '../../shared/Types';
import {CustomModal} from '../Misc/CustomModal';
import {QuantitySetter} from './QuantitySetter.component';
import {styles} from './StockDetailsBuySell.styles';
const closeIconSrc = require('../../../assets/icons/close_icon_black.png');

export const StockDetailsBuySell: React.FC<BuySellProps> = props => {
  const {theme} = useTheme();
  const {
    price,
    quantitySelected,
    quantityAvailable,
    setQuantitySelected,
    setQuantityAvailable,
    setBuySellViewable,
    setCurrentUserPortfolio,
    buySellViewable,
    stock,
    battle_id,
    user_id,
  } = props;
  const [cantSellModal, setCantSellModal] = useState(false);
  const [cantBuySellZeroModal, setCantBuySellZeroModal] = useState(false);
  const [succesfulPurchaseModal, setSuccesfulPurchaseModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState(PurchaseOrderInitializer);
  const [marketClosedModal, setMarketClosedModal] = useState(false);

  const buySellApiBody = {
    battle_id,
    user_id,
    symbol: stock.symbol,
    price: price > 0 ? price : stock.latestPrice,
    quantity: quantitySelected,
    action: 'to be defined',
  };

  const purchaseOrderBody = {
    quantity: quantitySelected,
    ticker: stock.companyName,
    price: price > 0 ? price : stock.latestPrice,
    action: 'to be defined',
  };

  const handleBuyOrder = () => {
    quantitySelected > 0
      ? // !stock.isUSMarketOpen
        //   ? setMarketClosedModal(true)
        //   :
        (ApiClient.postTransaction({
          ...buySellApiBody,
          action: 'BUY',
        }),
        setPurchaseOrder({
          ...purchaseOrderBody,
          action: 'BUY',
        }),
        setSuccesfulPurchaseModal(true),
        setQuantityAvailable(prevstate => prevstate + quantitySelected),
        setQuantitySelected(0),
        setTimeout(
          () =>
            showNotification(
              'Battle time is near..',
              "'Codeworks Battle' starts in 1 day",
            ),
          10000,
        ),
        setCurrentUserPortfolio(prevState => [
          ...prevState,
          {
            price: price > 0 ? price : stock.latestPrice,
            symbol: stock.symbol,
            change: 0,
            quantity: quantitySelected,
            averageCost: price > 0 ? price : stock.latestPrice,
            quote: stock,
          },
        ]))
      : setCantBuySellZeroModal(true);
  };

  const handleSellOrder = () => {
    quantitySelected > quantityAvailable
      ? setCantSellModal(true)
      : quantitySelected <= 0
      ? setCantBuySellZeroModal(true)
      : (ApiClient.postTransaction({
          ...buySellApiBody,
          action: 'SELL',
        }),
        setPurchaseOrder({
          ...purchaseOrderBody,
          action: 'SELL',
        }),
        setSuccesfulPurchaseModal(true),
        setQuantityAvailable(prevstate => prevstate - quantitySelected),
        setQuantitySelected(0));
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={buySellViewable}
        onRequestClose={() => {
          setBuySellViewable(!buySellViewable);
        }}>
        <View style={styles.buy_sell_modal_container}>
          <Pressable
            onPress={() => {
              setQuantitySelected(0);
              setBuySellViewable(false);
            }}>
            <Image style={styles.close_icon} source={closeIconSrc} />
          </Pressable>
          <View style={{alignItems: 'center'}}>
            <QuantitySetter
              quantitySelected={quantitySelected}
              setQuantitySelected={setQuantitySelected}
            />
            <View style={styles.total_amount}>
              {quantitySelected > 0 && (
                <Text style={{alignSelf: 'center', fontSize: 12}}>
                  Total:{' '}
                  {formatter.format(
                    (price > 0 ? price : stock.latestPrice) * quantitySelected,
                  )}
                </Text>
              )}
            </View>
          </View>
          <Text style={{alignSelf: 'center', fontFamily: theme.fonts.regular}}>
            {quantityAvailable} available to sell
          </Text>
          <View style={styles.buysell_button_container}>
            <Pressable
              onPress={handleSellOrder}
              style={[styles.button, {backgroundColor: theme.colors.lighter}]}>
              <Text style={styles.button_text}>Sell</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleBuyOrder}>
              <Text
                style={[styles.button_text, {color: theme.colors.lightest}]}>
                Buy
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ------------  Hidden Custom Modals ---------------*/}

        <CustomModal
          text="Cannot sell more stocks than you own."
          viewable={cantSellModal}
          setViewable={setCantSellModal}
        />

        <CustomModal
          text="You must select at least one stock"
          viewable={cantBuySellZeroModal}
          setViewable={setCantBuySellZeroModal}
        />

        <CustomModal
          text="Market is closed, try again later."
          viewable={marketClosedModal}
          setViewable={setMarketClosedModal}
        />

        <CustomModal
          text={`Success! ${purchaseOrder.quantity} ${
            purchaseOrder.ticker
          } stock${purchaseOrder.quantity > 1 ? 's' : ''} ${
            purchaseOrder.action === 'BUY' ? 'added to' : 'sold from'
          } your portfolio at a price of ${formatter.format(
            purchaseOrder.price,
          )}`}
          viewable={succesfulPurchaseModal}
          setViewable={setSuccesfulPurchaseModal}
        />
      </Modal>
    </View>
  );
};
