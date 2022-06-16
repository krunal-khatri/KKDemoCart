import {
  calculateTotalFromArray,
  findFromArrayByProperty,
} from '../../utils/commonActions';
import {CART} from '../type';

export const dispatchCartData = data => {
  return dispatch => {
    dispatch({
      type: CART,
      payload: {cart: data.cart, quantity: data.quantity},
    });
  };
};

export const handleAddCart = (
  item,
  setQuantity,
  isDecrement = false,
  filterCartData,
) => {
  return (dispatch, getState) => {
    const {cart} = getState().cartReducer;
    let existingCartObj;
    let params = {productId: item?.id, quantity: 1};
    let tempCart = [...cart];
    if (tempCart && tempCart?.length > 0) {
      existingCartObj = findFromArrayByProperty(
        tempCart,
        'productId',
        item?.id,
      );
      if (existingCartObj) {
        if (isDecrement) {
          if (existingCartObj.quantity - 1 === 0) {
            setQuantity(0);
            for (var i = 0; i < tempCart.length; i++) {
              if (tempCart[i]?.productId === existingCartObj?.productId) {
                tempCart.splice(i, 1);
              }
            }
          } else {
            existingCartObj.quantity = existingCartObj.quantity - 1;
            setQuantity(existingCartObj.quantity);
          }
        } else {
          existingCartObj.quantity = existingCartObj.quantity + 1;
          setQuantity(existingCartObj.quantity);
        }
      } else {
        tempCart.push(params);
        setQuantity(params?.quantity);
      }
    } else {
      tempCart.push(params);
      setQuantity(params?.quantity);
    }
    const totalQty = calculateTotalFromArray(tempCart);
    dispatch(dispatchCartData({cart: tempCart, quantity: totalQty ?? 0}));
    if (filterCartData) {
      filterCartData();
    }
  };
};
