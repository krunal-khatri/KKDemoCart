import {CART} from '../type';

const initialState = {
  cart: [],
  quantity: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART:
      return {cart: action.payload.cart, quantity: action.payload.quantity};
    default:
      return state;
  }
};
