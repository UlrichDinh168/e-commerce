import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import { productActions } from "actions";
import withLoadingScreen from "shared/Loading";

const Home = ({ showLoading, hideLoading }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  console.log(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        showLoading();
        dispatch(productActions.getAllProducts());
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    getProducts();
  }, []);

  return <div className="home"> Home</div>;
};

export default withLoadingScreen(Home);
