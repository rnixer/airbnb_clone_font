import React from "react";
import { useState } from "react";
import { createContext } from "react";
import * as placeApi from "../api/place";
import { useContext } from "react";
import { useEffect } from "react";

export const PlaceContext = createContext();

export default function PlaceContextProvider({ children }) {
  const [myPlaces, setMyPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [onFetch, setOnFetch] = useState(false);
  const [conditionBooking, setConditionBooking] = useState(false);

  const currentDate = new Date();

  const today = currentDate.toISOString().split("T")[0];
  // const plusOne = currentDate.setDate(currentDate.getDate() + 1);
  // const tomorrow = currentDate.toISOString().split("T")[0];

  const [checkIn_date, setCheckIn_date] = useState(today);
  const [checkOut_date, setCheckOut_date] = useState("");
  const [num_guests, setNum_guests] = useState("1");

  const createPlace = async (formData) => {
    await placeApi.createPlace(formData);
  };

  useEffect(() => {
    placeApi
      .getAllMyPlace()
      .then((res) => setMyPlaces(res.data.myPlaces))
      .catch((err) => console.log(err));
  }, [onFetch]);

  useEffect(() => {
    placeApi
      .getAllPlace()
      .then((res) => setAllPlaces(res.data.places))
      .catch((err) => console.log(err));
  }, [onFetch]);

  const deletePlace = async (e) => {
    await placeApi.deleteMyPlaceById(e);
  };

  const editPlace = async (formData, id) => {
    await placeApi.editMyPlaceById(formData, id);
  };

  // const totalPrice = () => {
  //   const dateOut = new Date(checkOut_date);
  //   const dateIn = new Date(checkIn_date);

  //   let price =
  //     +result.nightly_price *
  //     (Math.abs(dateOut - dateIn) / (1000 * 60 * 60 * 24));
  //   console.log(price);

  //   return price;
  // };

  return (
    <PlaceContext.Provider
      value={{
        createPlace,
        myPlaces,
        deletePlace,
        setOnFetch,
        editPlace,
        allPlaces,
        setConditionBooking,
        conditionBooking,
        setCheckIn_date,
        checkIn_date,
        checkOut_date,
        setCheckOut_date,
        num_guests,
        setNum_guests,
        // totalPrice,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

export const usePlace = () => {
  return useContext(PlaceContext);
};
