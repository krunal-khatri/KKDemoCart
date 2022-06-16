import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import {THEMES} from '../../../assets/theme/themes';
import {Header, ProductCard, _Text} from '../../../components';
import {useSelector} from 'react-redux';
import {findFromArrayByProperty} from '../../../utils/commonActions';
import {DUMMY_DATA} from '../../../constants/constants';

const {light} = THEMES;

const Cart = () => {
  const isFocused = useIsFocused();
  const {cart} = useSelector(({cartReducer}) => cartReducer);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    filterCartData();
  }, [isFocused, cart]);

  const filterCartData = () => {
    if (cart && cart?.length > 0) {
      let totalPrice = 0;
      const dataArr = [];
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        const productData = findFromArrayByProperty(
          DUMMY_DATA,
          'id',
          element?.productId,
        );
        totalPrice = parseFloat(
          (totalPrice + productData?.price * element?.quantity).toFixed(2),
        );
        dataArr.push(productData);
      }
      setTotal(totalPrice);
      setData(dataArr);
    } else {
      setTotal(0);
      setData([]);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ProductCard
        item={item}
        isFocused={isFocused}
        filterCartData={filterCartData}
      />
    );
  };

  return (
    <View style={styles.root}>
      <Header isback title={'Cart'} />
      <FlatList
        data={data}
        keyExtractor={(it, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          <_Text style={styles.emptyText} text={'Your Cart Is Empty.'} />
        }
      />
      {total ? (
        <_Text style={styles.totalText} text={`Total: ₹ ${total}`} />
      ) : null}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: light.colors.antiWhite},
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: light.spacer[3],
    paddingVertical: light.spacer[7],
  },
  totalText: {
    color: light.colors.darkGunmetal,
    fontFamily: light.fontFamily.medium,
    fontSize: light.fontSizes[4],
    margin: light.spacer[4],
    alignSelf: 'flex-end',
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
  },
});
