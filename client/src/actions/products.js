import { productTypes as types } from "./types";

export const getAllProducts = () => ({
  type: types.getAllProducts,
  payload: {
    rerquest: {
      method: "GET",
      url: "/products",
    },
  },
});

export const getProductById = (id) => ({
  type: types.getProductById,
  payload: {
    rerquest: {
      method: "GET",
      url: `/product/${id}`,
    },
  },
});
