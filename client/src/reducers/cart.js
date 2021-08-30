import { cartTypes as types } from "actions/types";

const initialState = {
  loading: true,
  error: null,
  cartItems: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addProductToCart:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case types.removeProductFromCart:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== item
        ),
      };
    default:
      return state;
  }
};
