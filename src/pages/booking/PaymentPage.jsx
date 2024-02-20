import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { usePlace } from "../../contexts/PlaceContext";
import ModelHomePage from "../all-places/ModelHomePage";
import { useParams } from "react-router-dom";
import { useAuth } from "../../feature/auth/contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../contexts/BookingContext";
import Spinner from "../../component/Spinner";

export default function PaymentPage() {
  const [slipImage, setSlipImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputEl = useRef(null);

  const navigate = useNavigate();
  const { placeId } = useParams();
  const {
    conditionBooking,
    allFilterPlaces,
    checkOut_date,
    checkIn_date,
    num_guests,
    setOnFetch,
  } = usePlace();

  // const { setOnFetch } = useBooking();

  const { createBooking } = useBooking();

  const { user } = useAuth();

  const result = allFilterPlaces.find((e) => e.id == placeId);

  const totalPrice = () => {
    const dateOut = new Date(checkOut_date);
    const dateIn = new Date(checkIn_date);

    let price =
      +result.nightly_price *
      (Math.abs(dateOut - dateIn) / (1000 * 60 * 60 * 24));

    return price;
  };

  // console.log(checkIn_date);
  // console.log(checkOut_date);
  // console.log(totalPrice());
  // console.log(slipImage);
  // console.log(result.id);
  // console.log(user.id);
  // console.log(num_guests);

  const handleOnConfirm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (result.id) {
        formData.append("property_id", result.id);
      }
      if (user.id) {
        formData.append("user_id", user.id);
      }
      if (checkIn_date) {
        formData.append("checkin_date", checkIn_date);
      }
      if (checkOut_date) {
        formData.append("checkout_date", checkOut_date);
      }
      if (totalPrice()) {
        formData.append("total_price", totalPrice());
      }
      if (slipImage) {
        formData.append("image", slipImage);
      }
      if (num_guests) {
        formData.append("num_guests", num_guests);
      }
      formData.append("booking_id");

      setLoading(true);
      await createBooking(formData);
      // await createPayment(formData)
      toast.success("Booking success");
      // setOnFetch((c) => !c);
      navigate("/account/booking");
    } catch (error) {
      toast.error(error.response?.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!conditionBooking && <ModelHomePage />}
      {loading && <Spinner />}
      <div className="flex flex-col gap-4 px-5 py-8 m-auto w-1/2   bg-white border rounded-2xl">
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
        <button onClick={handleOnConfirm} className="primary mt-5 hover:bg-hv">
          Confirm Payment
        </button>
      </div>
    </>
  );
}
