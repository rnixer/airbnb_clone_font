import React from "react";
import { Link } from "react-router-dom";

import PlaceList from "./placeList";

export default function PlacesPage() {
  return (
    <div>
      <div className="text-center mb-10">
        <Link //inline-flex = display : inline-block
          className="flex inline-flex bg-red text-white py-2 px-6 rounded-full hover:bg-hv"
          to={"account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <PlaceList />
    </div>
  );
}
