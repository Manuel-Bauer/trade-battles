import React from 'react';
import {
  View,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {theme} from '../shared/themes';
const width = Dimensions.get('window').width;
const arrowIconSrc = require('../../assets/icons/go_back_icon_black.png');

export const QuantitySetter: React.FC<{
  quantitySelected: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
}> = ({quantitySelected, setQuantitySelected}) => {
  return (
    <View>
      <View style={styles.quantity_setter}>
        <Pressable
          onPress={() => {
            if (quantitySelected > 0) {
              setQuantitySelected(prevState => prevState - 1);
            }
          }}
          style={styles.arrow_button}>
          <Image style={styles.arrow} source={arrowIconSrc} />
        </Pressable>

        <Text style={styles.quantity_selected}>{quantitySelected}</Text>

        {/* TODO --> Make quantity editable by text aswell */}
        <Pressable
          onPress={() => {
            setQuantitySelected(prevState => {
              return prevState + 1;
            });
          }}
          style={styles.arrow_button}>
          <Image
            style={[styles.arrow, {transform: [{rotate: '180deg'}]}]}
            source={arrowIconSrc}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantity_setter_container: {
    width: width * 0.7,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity_setter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 30,
  },
  quantity_selected: {
    fontSize: 25,
    color: theme.colorPrimary,
  },
  arrow: {
    width: 25,
    height: 25,
  },
  arrow_button: {
    padding: 20,
    backgroundColor: theme.greyPrimary,
    borderRadius: 50,
    marginHorizontal: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
});
