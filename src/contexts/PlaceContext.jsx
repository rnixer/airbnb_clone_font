import React from "react";
import { useState } from "react";
import { createContext } from "react";
import * as postApi from "../api/place";
import { useContext } from "react";
import { useEffect } from "react";

export const PlaceContext = createContext();

export default function PlaceContextProvider({ children }) {
  const [myPlaces, setMyPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [onFetch, setOnFetch] = useState(false);
  const [conditionBooking, setConditionBooking] = useState(false);

  const [checkIn_date, setCheckIn_date] = useState("");
  const [checkOut_date, setCheckOut_date] = useState("");
  const [num_guests, setNum_guests] = useState("");

  const createPlace = async (formData) => {
    await postApi.createPlace(formData);
  };

  useEffect(() => {
    postApi
      .getAllMyPlace()
      .then((res) => setMyPlaces(res.data.myPlaces))
      .catch((err) => console.log(err));
  }, [onFetch]);

  useEffect(() => {
    postApi
      .getAllPlace()
      .then((res) => setAllPlaces(res.data.places))
      .catch((err) => console.log(err));
  }, [onFetch]);

  const deletePlace = async (e) => {
    await postApi.deleteMyPlaceById(e);
  };

  const editPlace = async (formData, id) => {
    await postApi.editMyPlaceById(formData, id);
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
