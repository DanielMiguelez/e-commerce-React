import { createContext } from "react";
import axios from "axios";

export const OrderContext = createContext();

export const OrdersProvider = ({ children }) => {
  const API_URL = "http://localhost:3001";
  const createOrder = async (order) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.post(
        API_URL + "orders/createOrder",
        { productIds: order },
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

  return (
    <OrderContext.Provider
      value={{
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
