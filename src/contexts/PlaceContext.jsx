import React from "react";
import { useState } from "react";
import { createContext } from "react";
import * as postApi from "../api/place";
import { useContext } from "react";

export const PlaceContext = createContext();

export default function PostContextProvider({ children }) {
  const [place, setPlace] = useState([]);

  const createPlace = async (formData) => {
    await postApi.createPlace(formData);
  };

  return (
    <PlaceContext.Provider value={{ createPlace }}>
      {children}
    </PlaceContext.Provider>
  );
}

export const usePlace = () => {
  return useContext(PlaceContext);
};
