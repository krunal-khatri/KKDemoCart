import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {THEMES} from '../../assets/theme/themes';
import {_Text} from '../text';

const {light} = THEMES;
const Counter = props => {
  const {addToCart, quantity, fromProduct} = props;
  return (
    <View
      style={[
        styles.manageQty,
        {height: fromProduct ? 50 : 40, minWidth: fromProduct ? 150 : 100},
      ]}>
      <TouchableOpacity
        style={{padding: light.spacer[4]}}
        onPress={() => {
          addToCart(true);
        }}>
        <Icon
          name={'remove'}
          size={fromProduct ? 30 : 25}
          color={light.colors.rubyRed}
        />
      </TouchableOpacity>
      <_Text
        numberOfLines={2}
        style={{
          color: light.colors.black,
          fontFamily: light.fontFamily.medium,
          fontSize: fromProduct ? light.fontSizes[3] : light.fontSizes[1],
        }}
        text={quantity}
      />
      <TouchableOpacity
        style={{padding: light.spacer[4]}}
        onPress={() => {
          addToCart(false);
        }}>
        <Icon
          name={'add'}
          size={fromProduct ? 30 : 25}
          color={light.colors.green}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    minHeight: light.spacer[20],
    backgroundColor: light.colors.white,
    marginBottom: light.spacer[7],
    borderRadius: light.borderRadius[2],
    shadowColor: light.colors.shadowColor,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    padding: light.spacer[8],
  },
  description: {flex: 1, padding: light.spacer[4]},
  descriptionText: {
    color: light.colors.darkGunmetal,
    fontFamily: light.fontFamily.medium,
    fontSize: light.fontSizes[1],
    opacity: 0.7,
  },
  ratingContainer: {flexDirection: 'row', alignItems: 'center'},
  addToCartButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: light.spacer[4],
    paddingHorizontal: light.spacer[6],
    backgroundColor: light.colors.primary,
    borderRadius: light.borderRadius[2],
  },
  manageQty: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-end',
    borderColor: light.colors.pearlyPurple,
    borderWidth: 1,
    borderRadius: light.borderRadius[3],
    alignItems: 'center',
  },
});
