import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../contexts/BookingContext";

export default function AllPlacesItem({ place }) {
  const { property_name, image, description, nightly_price, address, id } =
    place;

  const navigate = useNavigate();
  const handleOnBooking = (id) => {
    navigate(`/bookingPage/${id}`);
  };

  return (
    <>
      <div className="flex gap-10 border rounded-xl w-4/5 mx-auto px-10 py-5 bg-white shadow-md  ">
        <img
          src={image}
          alt="place"
          className="text-green-500 rounded-2xl w-1/4"
        ></img>

        <div className="flex flex-col w-full gap-2 ">
          <div className="flex flex-col mt-5 gap-2">
            <h1 className="text-2xl font-bold">{property_name}</h1>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <div className="text-sm text-gray-400  ">{address}</div>
            </div>
          </div>

          <div>
            <div className="mt-2"> {description}</div>
          </div>
          <div className="mt-5">
            <span className="font-bold text-2xl pr-3">
              {nightly_price} bath
            </span>{" "}
            per night
            <button
              onClick={() => handleOnBooking(id)}
              className="text-xl ml-10 px-12 py-1 border rounded-2xl bg-red text-white hover:bg-hv"
            >
              Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
