import { productTypes as types } from "actions/types";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllProducts:
      return {
        ...state,
        loading: true,
      };
    case types.getAllProductsSuccess:
      return {
        ...state,
        products: [...state.products, ...action.payload.data],
        loading: false,
      };
    case types.getProductById:
      return {
        ...state,
        loading: true,
      };
    case types.getProductByIdSuccess:
      return {
        ...state,
        product: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
