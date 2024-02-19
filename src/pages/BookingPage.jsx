import React from "react";
import { usePlace } from "../contexts/PlaceContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModelHomePage from "./all-places/ModelHomePage";

export default function BookingPage() {
  const { allPlaces, checkIn_date, checkOut_date, conditionBooking } =
    usePlace();
  const { placeId } = useParams();

  const navigate = useNavigate();

  const result = allPlaces.find((e) => e.id == placeId);

  const totalPrice = () => {
    const dateOut = new Date(checkOut_date);
    const dateIn = new Date(checkIn_date);

    let price =
      +result.nightly_price *
      (Math.abs(dateOut - dateIn) / (1000 * 60 * 60 * 24));
    console.log(price);

    return price;
  };

  const handleOnPay = (placeId) => {
    navigate(`/payment/${placeId}`);
  };

  return (
    <>
      {!conditionBooking && <ModelHomePage />}
      <div className="flex flex-col gap-5 mt-6 w-3/5 mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold"> {result.property_name}</h1>
          <div className="flex">
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
            {result.address}
          </div>
        </div>
        <img className="w-3/5 mx-auto my-5 rounded-3xl" src={result.image} />
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">Description</div>
          <div>{result.description}</div>
        </div>

        <div>
          {" "}
          <span className="text-lg font-bold">Price</span> :{" "}
          {result.nightly_price} bath /per night
        </div>
        <div>
          {" "}
          <span className="font-bold">Total Price </span> : {totalPrice()} Bath
        </div>
        <button
          className="primary hover:bg-hv"
          onClick={() => handleOnPay(placeId)}
        >
          Make payment
        </button>
      </div>
    </>
  );
}
