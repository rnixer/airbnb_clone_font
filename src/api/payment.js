import axios from "../config/axios";

export const getAllPaymentByPayerId = (payerId) =>
  axios.get(`/payments/${payerId}`);
