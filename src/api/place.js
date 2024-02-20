import axios from "../config/axios";

export const createPlace = (formData) => axios.post("/places", formData);
export const getAllMyPlace = () => axios.get("/places");
export const deleteMyPlaceById = (id) => axios.delete(`/places/${id}`);
export const editMyPlaceById = (formData, id) =>
  axios.patch(`/places/${id}`, formData);

// export const getAllPlace = () => axios.get("/places/all");
export const getAllFilterPlace = (checkIn_date, checkOutDate, num_guests) =>
  axios.get(`/places/${checkIn_date}/${checkOutDate}/${num_guests}`);
