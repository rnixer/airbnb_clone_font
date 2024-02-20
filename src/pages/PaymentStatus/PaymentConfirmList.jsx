import React from "react";
import { usePayment } from "../../contexts/PaymentContext";
import PaymentConfirmItem from "./PaymentConfirmItem";

export default function PaymentConfirmList() {
  const { paymentList } = usePayment();

  return (
    <div>
      {paymentList.map((payment) => (
        <PaymentConfirmItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
