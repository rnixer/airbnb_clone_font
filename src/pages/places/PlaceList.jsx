import React from "react";
import PlaceItem from "./placeItem";
import { usePlace } from "../../contexts/PlaceContext";

export default function PlaceList() {
  const { myPlaces } = usePlace();
  return (
    <div className="flex flex-col gap-10">
      {myPlaces.map((myPlace) => (
        <PlaceItem key={myPlace.id} myPlace={myPlace} />
      ))}
    </div>
  );
}
