import { useEffect } from "react";
import { createContext } from "react";
import * as paymentApi from "../api/payment";
import * as bookingApi from "../api/booking";
import { useState } from "react";
import { useContext } from "react";
import { useAuth } from "../feature/auth/contexts/AuthContext";

export const PaymentContext = createContext();

export default function PaymentContextProvider({ children }) {
  const [paymentList, setPaymentList] = useState([]);
  const [onFetch, setOnFetch] = useState(false);
  const { user } = useAuth();
  //   console.log("user", user.id);

  useEffect(() => {
    paymentApi
      .getAllPaymentByPayerId(user.id)
      .then((res) => setPaymentList(res.data.payment))
      .catch((err) => console.log(err));
  }, [onFetch]);

  const acceptOrReject = async (data, id) => {
    await paymentApi.acceptOrReject(data, id);
  };

  const deleteBookingFailure = async (id) => {
    await bookingApi.deleteBookingFailure(id);
  };

  return (
    <PaymentContext.Provider
      value={{ paymentList, acceptOrReject, deleteBookingFailure, setOnFetch }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  return useContext(PaymentContext);
};
