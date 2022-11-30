import React, { createContext, useReducer } from 'react';
import ProductReducer from "./ProductReducer"
import axios from "axios"

const initialState = {
    loading: false,
    categories: [],
    products: []
}


export const ProductContext = createContext(initialState);

export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);
    const url = 'http://localhost:3001';

    const getCategories = async () => {
        dispatch({
            type: "LOADING"
        });
        try {
            const res = await axios.get(`${url}/categories/getCategories`);
            console.log(res)
            dispatch({
                type: "GET_CATEGORIES",
                payload: res.data
            });
        } catch(error) {
            console.error(error)
        }
    };

    const getProducts = async (name, category, minPrice, maxPrice, priceOrder) => {
        dispatch({
            type: "LOADING"
        });
        try {
            const res = await axios.get(`${url}/products/getProductsQuery?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&priceOrder=${priceOrder}`);
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data.results
            });
        } catch(error) {
            console.error(error)
        }
    };

    return ( 
        <ProductContext.Provider value = {
            {
                loading: state.loading,
                categories: state.categories,
                products: state.products,
                getCategories,
                getProducts
            }
        } >
            {children} 
        </ProductContext.Provider>
    );

}