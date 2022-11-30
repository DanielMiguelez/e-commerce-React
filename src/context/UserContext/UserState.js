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
    const res = await axios.post(API_URL + "/users/login", user);
    dispatch({
      type: "LOGIN",
      payload: res.data,
    });

    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
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
      console.log(res)
    dispatch({
      type: "GET_USER_INFO",

      payload: res.data.user,
    });

    return res;
  };

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        getUserInfo
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContext = createContext(initialState);
