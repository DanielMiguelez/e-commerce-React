import React, { createContext, useReducer } from 'react';
import AppReducer from "./AppReducer"
import axios from "axios"

const initialState = {
    loading: false
}


export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return ( 
        <GlobalContext.Provider value = {
            {
                loading: state.loading
            }
        } >
            {children} 
        </GlobalContext.Provider>
    );

}