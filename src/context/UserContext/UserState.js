import { createContext, useReducer } from "react";
import axios from "axios";
import UserReducer from "./UserReducer";
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,

  user: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const API_URL = "http://localhost:3001";

  const login = async (user) => {
    try {
      const res = await axios.post(API_URL + "/users/login", user);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });

      if (res.data && res.data.ok) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        return false;
      }
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(
      API_URL + "/users/getInfoUser",

      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({
      type: "GET_USER_INFO",

      payload: res.data.user,
    });

    return res;
  };

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.delete(
      API_URL + "/users/logout",

      {
        headers: {
          authorization: token,
        },
      }
    );

    dispatch({
      type: "LOGOUT",
      payload: res.data,
    });
    if (res.data) {
      localStorage.removeItem("token");
    }
  };

  const register = async (user) => {
    try {
      const res = await axios.post(API_URL + "/users/createUser", user);
      dispatch({
        type: "REGISTER",
        payload: res.data,
      });
      return false;
    } catch (error) {
      console.error(error)
     /* return error.response.data.msg*/
     return true
    }
  };

  const addProductToFavourites = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      await axios.put(API_URL + "/users/addFavouriteProduct", 
      { product_id: id}, 
      {
        headers: {
          authorization: token,
        }
      });
      dispatch({
        type: "ADD_FAVOURITES"
      });
    } catch (error) {
      console.error(error)
    }
  };

  const removeProductToFavourites = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      await axios.put(API_URL + "/users/removeFavouriteProduct", 
      { product_id: id}, 
      {
        headers: {
          authorization: token,
        }
      });
      dispatch({
        type: "REMOVE_FAVOURITES"
      });
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        logout,
        getUserInfo,
        register,
        addProductToFavourites,
        removeProductToFavourites
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext(initialState);
