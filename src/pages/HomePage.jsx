import { useState } from "react";
import ModelHomePage from "./all-places/ModelHomePage";
import { usePlace } from "../contexts/PlaceContext";
import AllPlacesItem from "./all-places/AllPlacesItem";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const { allFilterPlaces } = usePlace();
  const { conditionBooking } = usePlace();

  // const { checkInDate, checkOutDate } = useParams();

  return (
    <>
      {!conditionBooking && <ModelHomePage />}
      <div className="flex flex-col gap-10 mt-12">
        {allFilterPlaces.map((place) => (
          <AllPlacesItem key={place.id} place={place} />
        ))}
      </div>
    </>
  );
}
