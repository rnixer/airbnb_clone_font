import axios from "../config/axios";

export const getAllPaymentByPayerId = (payerId) =>
  axios.get(`/payments/${payerId}`);

export const acceptOrReject = (data, id) =>
  axios.patch(`/payments/${id}`, data);
