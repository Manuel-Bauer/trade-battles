import LottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {theme} from '../shared/themes';
import {useNavigation} from '@react-navigation/native';
const correctTransactionSrc = require('../../assets/lotties/correct_transaction.json');
const incorrectTransactionSrc = require('../../assets/lotties/incorrect_transaction.json');
const confettiSrc = require('../../assets/lotties/confetti.json');


const width = Dimensions.get('window').width;
export const CustomModal: React.FC<{
  viewable: boolean;
  setViewable: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}> = ({viewable = false, setViewable, text}) => {
  const modalIsAPositiveResponse = text.includes('Success');
  const navigation = useNavigation();
  function handleConfirm(): void {
    setViewable(false);
    navigation.goBack();
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewable}
        onRequestClose={() => {
          setViewable(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                fontFamily: theme.fontFamilyBold,
              }}>
              {modalIsAPositiveResponse ? 'Succes' : 'Unsuccesful'}
            </Text>
            <View style={{width: 160, height: 160}}>
              {modalIsAPositiveResponse ? (
                <>
                  <LottieView
                    source={correctTransactionSrc}
                    autoPlay
                    loop={false}
                  />

                  <LottieView source={confettiSrc} autoPlay />
                </>
              ) : (
                <LottieView
                  source={incorrectTransactionSrc}
                  autoPlay
                  loop={false}
                />
              )}
            </View>
            <Text style={styles.modalText}>
              {modalIsAPositiveResponse ? text.split('!')[1] : text}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleConfirm()}>
              <Text style={styles.textStyle}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '60%',
    height: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.91,
  },

  button: {
    padding: 15,
    borderRadius: 15,
  },
  buttonClose: {
    backgroundColor: theme.colorPrimary,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: theme.fontFamilyRegular,
  },
});
