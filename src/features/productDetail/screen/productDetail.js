import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {THEMES} from '../../../assets/theme/themes';
import {_Text} from '../../../components/text';
import Counter from '../../../components/counter/counter.component';
import {handleAddCart} from '../../../redux-store/action/cartAction';
import {Header} from '../../../components';
import {findFromArrayByProperty} from '../../../utils/commonActions';

const {light} = THEMES;
const {height} = Dimensions.get('screen');

const ProductDetail = ({route}) => {
  const isFocused = useIsFocused();
  const item = route?.params?.item;
  const {cart} = useSelector(({cartReducer}) => cartReducer);
  const dispatch = useDispatch();
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
    dispatch(handleAddCart(item, setQuantity, isDecrement));
  };

  return (
    <ScrollView style={styles.root}>
      <Header isback title={'Product Detail'} />
      <View style={styles.card}>
        <FastImage
          style={{height: height * 0.35, marginVertical: light.spacer[4]}}
          source={{
            uri: item?.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.ratingContainer}>
          <View style={styles.ratingSubContainer}>
            <Icon name={'star'} size={35} color={light.colors.gold} />
            <_Text
              style={{
                color: light.colors.black,
                fontFamily: light.fontFamily.regular,
                fontSize: light.fontSizes[3],
              }}
              text={` ${item?.rating?.rate} (${item?.rating?.count})`}
            />
          </View>
          <_Text
            style={{
              color: light.colors.darkGunmetal,
              fontFamily: light.fontFamily.medium,
              fontSize: light.fontSizes[4],
              marginVertical: light.spacer[4],
            }}
            text={`₹ ${item?.price}`}
          />
        </View>
        <View style={styles.description}>
          <_Text
            style={{
              color: light.colors.darkGunmetal,
              fontFamily: light.fontFamily.bold,
              fontSize: light.fontSizes[4],
              marginVertical: light.spacer[4],
            }}
            text={item?.title}
          />
          <_Text style={styles.descriptionText} text={item?.description} />
          <View style={{marginVertical: light.spacer[8]}}>
            {quantity ? (
              <Counter fromProduct addToCart={addToCart} quantity={quantity} />
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
                    fontSize: light.fontSizes[3],
                  }}
                  text={'Add To Cart'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEMES.light.colors.antiWhite,
    flex: 1,
  },
  card: {
    flex: 1,
    minHeight: light.spacer[20],
    backgroundColor: light.colors.white,
    marginBottom: light.spacer[7],
    borderRadius: light.borderRadius[7],
    shadowColor: light.colors.shadowColor,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    padding: light.spacer[8],
    margin: light.spacer[7],
  },
  description: {flex: 1, padding: light.spacer[4]},
  descriptionText: {
    color: light.colors.darkGunmetal,
    fontFamily: light.fontFamily.medium,
    fontSize: light.fontSizes[4],
    opacity: 0.7,
    marginVertical: light.spacer[4],
  },
  ratingSubContainer: {flexDirection: 'row', alignItems: 'center'},
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: light.spacer[4],
    justifyContent: 'space-between',
  },
  addToCartButton: {
    height: 50,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: light.spacer[4],
    paddingHorizontal: light.spacer[6],
    backgroundColor: light.colors.primary,
    borderRadius: light.borderRadius[2],
  },
});
