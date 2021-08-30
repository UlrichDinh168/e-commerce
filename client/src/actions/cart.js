import { cartTypes as types } from "./types";

export const addToCart = (id, data) => {
  return {
    type: types.addProductToCart,
    payload: {},
  };
};
