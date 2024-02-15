import axios from "../config/axios";
export const createPlace = (formData) => axios.post("/places", formData);
