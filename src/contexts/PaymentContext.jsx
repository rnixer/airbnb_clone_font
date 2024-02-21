import { useEffect } from "react";
import { createContext } from "react";
import * as PaymentApi from "../api/payment";
import { useState } from "react";
import { useContext } from "react";
import { useAuth } from "../feature/auth/contexts/AuthContext";

export const PaymentContext = createContext();

export default function PaymentContextProvider({ children }) {
  const [paymentList, setPaymentList] = useState([]);
  const { user } = useAuth();
  //   console.log("user", user.id);

  useEffect(() => {
    PaymentApi.getAllPaymentByPayerId(user.id)
      .then((res) => setPaymentList(res.data.payment))
      .catch((err) => console.log(err));
  }, []);

  return (
    <PaymentContext.Provider value={{ paymentList }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  return useContext(PaymentContext);
};
