import React from 'react';
import {View, Pressable, Text, Image} from 'react-native';
import {useTheme} from '../../Contexts/Theme';
import {styles} from './QuantitySetter.styles';
const arrowIconSrc = require('../../../assets/icons/go_back_icon_black.png');

export const QuantitySetter: React.FC<{
  quantitySelected: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
}> = ({quantitySelected, setQuantitySelected}) => {
  const {theme} = useTheme();
  return (
    <View>
      <View style={styles.quantity_setter}>
        <Pressable
          onPress={() => {
            if (quantitySelected > 0) {
              setQuantitySelected(prevState => prevState - 1);
            }
          }}
          style={{
            ...styles.arrow_button,
            backgroundColor: theme.colors.lightest,
          }}>
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
          style={{
            ...styles.arrow_button,
            backgroundColor: theme.colors.lightest,
          }}>
          <Image
            style={[styles.arrow, {transform: [{rotate: '180deg'}]}]}
            source={arrowIconSrc}
          />
        </Pressable>
      </View>
    </View>
  );
};
