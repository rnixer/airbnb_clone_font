import React from "react";
import PlaceItem from "./placeItem";
import { usePlace } from "../../contexts/PlaceContext";

export default function PlaceList() {
  const { places } = usePlace();
  return (
    <div className="flex flex-col gap-10">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </div>
  );
}
