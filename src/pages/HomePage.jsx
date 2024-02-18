import { useState } from "react";
import ModelHomePage from "../component/ModelHomePage";
import { usePlace } from "../contexts/PlaceContext";
import AllPlacesItem from "./all-places/AllPlacesItem";

export default function HomePage() {
  const { allPlaces } = usePlace();
  const [conditionBooking, setConditionBooking] = useState(false);

  return (
    <>
      {!conditionBooking ? (
        <ModelHomePage />
      ) : (
        <div className="flex flex-col gap-10 mt-12">
          {allPlaces.map((place) => (
            <AllPlacesItem key={place.id} place={place} />
          ))}
        </div>
      )}
    </>
  );
}
