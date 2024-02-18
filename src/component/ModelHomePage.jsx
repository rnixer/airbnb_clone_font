import React from "react";
import { useState } from "react";
import { usePlace } from "../contexts/PlaceContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ModelHomePage() {
  const navigate = useNavigate();
  const {
    Sreach,
    setConditionBooking,
    setCheckIn_date,
    checkIn_date,
    checkOut_date,
    setCheckOut_date,
    num_guests,
    setNum_guests,
  } = usePlace();
  //   useEffect(() => {
  //     const { checkIn_date, checkOut_date, num_guests } = Sreach;
  //     console.log(Sreach);
  //   }, []);

  const handleOnSreach = () => {
    if (checkIn_date && checkOut_date && num_guests) {
      setConditionBooking((c) => !c);
      //   Sreach.current.checkIn_date = checkIn_date;
      //   Sreach.current.checkOut_date = checkOut_date;
      //   Sreach.current.num_guests = num_guests;
      //   console.log(Sreach.current.value);
      navigate("/account/places/account/places/new");
    } else {
      toast.error(
        "Please enter your check-in , check-out date and number of your guests."
      );
    }
  };

  return (
    <>
      <div className="fixed flex flex-col justify-center items-center inset-0 bg-gray-400 opacity-50 "></div>
      <div className="inset-0 fixed flex flex-col justify-center items-center ">
        <div className=" bg-white min-w-[500px] min-h-2/5 opacity-100 z-10 rounded-2xl pt-7 pb-5 px-10">
          <div className="flex flex-col justify-center gap-5">
            <div>
              {/* <div className="ml-96 cursor-pointer">&#010005;</div> */}
              <div className="text-center text-3xl font-bold">Booking </div>
            </div>
            <div className="flex justify-around border rounded-xl">
              <div className="flex flex-col gap-1 py-2">
                <div>Check in date:</div>
                <input
                  type="date"
                  value={checkIn_date}
                  //   ref={Sreach.current.checkIn_date}
                  className=""
                  onChange={(e) => setCheckIn_date(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col gap-1 py-2 border-l pl-12">
                <div className="">Check out date:</div>
                <input
                  type="date"
                  //   ref={Sreach.current.checkOut_date}
                  value={checkOut_date}
                  className=""
                  onChange={(e) => setCheckOut_date(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <div>Number of guests :</div>
              <input
                type="number"
                // ref={Sreach}
                value={num_guests}
                className=""
                onChange={(e) => setNum_guests(e.target.value)}
                placeholder="number of guests "
              />
            </div>
            <button onClick={handleOnSreach} className="primary">
              Sreach for booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
