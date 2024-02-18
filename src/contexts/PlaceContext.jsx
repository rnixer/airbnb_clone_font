import React from "react";
import { useState } from "react";
import { createContext } from "react";
import * as postApi from "../api/place";
import { useContext } from "react";
import { useEffect } from "react";

export const PlaceContext = createContext();

export default function PostContextProvider({ children }) {
  const [myPlaces, setMyPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [onFetch, setOnFetch] = useState(false);

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

  return (
    <PlaceContext.Provider
      value={{
        createPlace,
        myPlaces,
        deletePlace,
        setOnFetch,
        editPlace,
        allPlaces,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
}

export const usePlace = () => {
  return useContext(PlaceContext);
};
