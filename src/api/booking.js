import axios from "../config/axios";

export const createBooking = (formData) => axios.post("/bookings", formData);

export const getBookedPlacesById = () => axios.get("/bookings");

export const deleteBookingFailure = () => axios.delete("/bookings");
