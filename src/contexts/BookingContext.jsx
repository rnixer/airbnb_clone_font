import { useContext } from "react";
import { createContext } from "react";
import * as bookingApi from "../api/booking";
import { useState } from "react";
import { useEffect } from "react";

export const BookingContext = createContext();

export default function BookingContextProvider({ children }) {
  const [bookedList, setBookedList] = useState([]);

  const createBooking = async (formData) => {
    await bookingApi.createBooking(formData);
  };

  useEffect(() => {
    bookingApi
      .getBookedPlacesById()
      .then((res) => setBookedList(res.data.bookedPlaces))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BookingContext.Provider value={{ createBooking, bookedList }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  return useContext(BookingContext);
};
