import React, { createContext, useReducer } from "react";
import ProductReducer from "./ProductReducer";
import axios from "axios";

const initialState = {
  loading: false,
  product: null,
  categories: [],
  products: [],
  cart: [],
};

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const url = "http://localhost:3001";

    const getCategories = async () => {
        dispatch({
            type: "LOADING"
        });
        try {
            const res = await axios.get(`${url}/categories/getCategories`);
            dispatch({
                type: "GET_CATEGORIES",
                payload: res.data
            });
        } catch(error) {
            console.error(error)
        }
    };

  const getProducts = async (
    name,
    category,
    minPrice,
    maxPrice,
    priceOrder
  ) => {
    dispatch({
      type: "LOADING",
    });
    try {
      const res = await axios.get(
        `${url}/products/getProductsQuery?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&priceOrder=${priceOrder}`
      );
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data.results,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const getProduct = async (id) => {
    dispatch({
      type: "LOADING",
    });
    try {
      const res = await axios.get(
        `${url}/products/getProductById/id/${id}`
      );
      dispatch({
        type: "GET_PRODUCT",
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  } 

  const createOrder = async (order) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(order)
      const res = await axios.post( 
        `${url}/orders/createOrder`,
        {products:order},
        {
          headers: {
            authorization: token,
          },
        }
        );
      console.log(res);

    } 
    
    catch (error) {
      console.error(error);
    }
  };
 
  return (
    <ProductContext.Provider
      value={{
        loading: state.loading,
        categories: state.categories,
        products: state.products,
        product: state.product,
        cart: state.cart,
        getCategories,
        getProducts,
        addCart,
        clearCart,
        createOrder,
        getProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
