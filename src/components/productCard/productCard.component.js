import React, {useEffect, useState} from 'react';
import {View, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {THEMES} from '../../assets/theme/themes';
import {handleAddCart} from '../../redux-store/action/cartAction';
import {findFromArrayByProperty} from '../../utils/commonActions';
import Counter from '../counter/counter.component';
import {_Text} from '../text';

const {width} = Dimensions.get('screen');
const {light} = THEMES;

const ProductCard = ({item, isFocused, filterCartData}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {cart} = useSelector(({cartReducer}) => cartReducer);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existingCartObj = findFromArrayByProperty(
      cart,
      'productId',
      item?.id,
    );
    setQuantity(existingCartObj?.quantity);
  }, [item, isFocused]);

  const addToCart = (isDecrement = false) => {
    dispatch(handleAddCart(item, setQuantity, isDecrement, filterCartData));
  };

  const handleNavigation = () => {
    navigation.navigate('detail', {item: item});
  };

  return (
    <TouchableOpacity onPress={handleNavigation} style={styles.root}>
      <FastImage
        style={{width: width * 0.3, height: width * 0.3}}
        source={{
          uri: item?.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.description}>
        <_Text
          numberOfLines={1}
          style={{
            color: light.colors.darkGunmetal,
            fontFamily: light.fontFamily.bold,
            fontSize: light.fontSizes[1],
          }}
          text={item?.title}
        />
        <_Text
          numberOfLines={2}
          style={styles.descriptionText}
          text={item?.description}
        />
        <_Text
          numberOfLines={2}
          style={{
            color: light.colors.darkGunmetal,
            fontFamily: light.fontFamily.medium,
            fontSize: light.fontSizes[1],
          }}
          text={`₹ ${item?.price}`}
        />
        <View style={styles.ratingContainer}>
          <Icon name={'star'} size={20} color={light.colors.gold} />
          <_Text
            numberOfLines={2}
            style={{
              color: light.colors.black,
              fontFamily: light.fontFamily.regular,
              fontSize: light.fontSizes[0],
            }}
            text={` ${item?.rating?.rate} (${item?.rating?.count})`}
          />
        </View>
        <_Text
          numberOfLines={1}
          style={styles.descriptionText}
          text={`In stock: ${
            isNaN(item?.stock - quantity) ? item?.stock : item?.stock - quantity
          }`}
        />
        {quantity ? (
          <Counter addToCart={addToCart} quantity={quantity} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              addToCart(false);
            }}
            style={styles.addToCartButton}>
            <_Text
              numberOfLines={2}
              style={{
                color: light.colors.white,
                fontFamily: light.fontFamily.medium,
                fontSize: light.fontSizes[1],
              }}
              text={'Add To Cart'}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

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
});
