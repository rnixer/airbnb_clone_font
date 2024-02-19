import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { usePlace } from "../contexts/PlaceContext";
import ModelHomePage from "./all-places/ModelHomePage";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const [slipImage, setSlipImage] = useState(null);
  const fileInputEl = useRef(null);

  const { placeId } = useParams();
  const { conditionBooking, allPlaces, checkOut_date, checkIn_date } =
    usePlace();

  const result = allPlaces.find((e) => e.id == placeId);
  console.log(placeId);

  const totalPrice = () => {
    const dateOut = new Date(checkOut_date);
    const dateIn = new Date(checkIn_date);

    let price =
      +result.nightly_price *
      (Math.abs(dateOut - dateIn) / (1000 * 60 * 60 * 24));

    return price;
  };

  const onSubmitConfirm = () => {
    e.preventDefault();
    console.log("*****************");
  };

  return (
    <>
      {/* {!conditionBooking && <ModelHomePage />} */}
      <form
        onSubmit={onSubmitConfirm}
        className="flex flex-col gap-4 px-5 py-8 m-auto w-2/6 max-h-2/5  bg-white border rounded-2xl"
      >
        <div className="font-bold text-2xl border-b w-full text-center pb-5">
          Payment
        </div>
        <div className="flex flex-col gap-10 px-8 mt-5">
          <div>
            {" "}
            <span className="font-bold">Total Price : </span>
            {totalPrice()} Bath
          </div>
          <div>
            <span className="font-bold">Recipient Mobile Promptpay : </span>{" "}
            {result.mobile_promptpay}
          </div>
          <div className="flex">
            <div className="font-bold">Transfer Slip :</div>
            <input
              type="file"
              className="hidden"
              ref={fileInputEl}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSlipImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex justify-center">
            {slipImage ? (
              <div
                className="relative flex justify-center "
                onClick={() => fileInputEl.current.click()}
              >
                <img
                  src={URL.createObjectURL(slipImage)}
                  className="max-h-[300px] "
                  alt="slip"
                />
                <div
                  className="absolute top-1 right-5 text-2xl font-black cursor-pointer"
                  onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    setSlipImage(null);
                    fileInputEl.current.value = "";
                  }}
                >
                  &#10005;
                </div>
              </div>
            ) : (
              <div
                className="flex justify-center items-center gap-2 border bg-transparent rounded-2xl mx-auto p-16 w-4/5 text-2xl text-gray-600 cursor-pointer"
                onClick={() => fileInputEl.current.click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload Slip
              </div>
            )}
          </div>
        </div>
        <button className="primary mt-5 hover:bg-hv">Confirm Payment</button>
      </form>
    </>
  );
}
