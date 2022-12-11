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
            type: "LOADING",
        });
        try {
            const res = await axios.get(`${url}/categories/getCategories`);
            dispatch({
                type: "GET_CATEGORIES",
                payload: res.data,
            });
        } catch (error) {
            console.error(error);
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

    const addOneCart = (product) => {
        let found = false;
        state.cart.forEach(item => {
            if(product.id === item.product.id) {
                item.amount++;
                found = true;
            }
        });
        if(!found) {
            state.cart.push({product, amount: 1});
        }
        dispatch({
            type: "ADD_ONE_CART",
            payload: state.cart,
        });
    };

    const removeOneCart = (product) => {
        for (let i = 0; i < state.cart.length; i++) {
            if(state.cart[i].product.id === product.id) {
                state.cart[i].amount--;
                if(state.cart[i].amount === 0)
                    state.cart.splice(i, 1);
                break;
            }
        }
        dispatch({
            type: "REMOVE_ONE_CART",
            payload: state.cart,
        });
    };

    const removeCartProduct = (product) => {
        for (let i = 0; i < state.cart.length; i++) {
            if(state.cart[i].product.id === product.id) {
              state.cart.splice(i, 1);
              break;
            }
        }
        dispatch({
            type: "REMOVE_CART_PRODUCT",
            payload: state.cart,
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
    };

    const createOrder = async (cart) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            const products = []
            for (const item of cart) {
                products.push({id: item.product.id, amount: item.amount})
            }

            await axios.post(
                `${url}/orders/createOrder`,
                { products: products },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (product) => {
        const token = JSON.parse(localStorage.getItem("token"));

        try {
            await axios.delete(
                `${url}/products/deleteProductById/id/${product.id}`,
                {
                    headers: {
                      authorization: token,
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }

        dispatch( {
            type: "DELETE_PRODUCT",
            payload: product,
        })
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
                addOneCart,
                removeOneCart,
                clearCart,
                createOrder,
                getProduct,
                removeCartProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
