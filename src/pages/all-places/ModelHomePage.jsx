import React from "react";
import { usePlace } from "../../contexts/PlaceContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as placeApi from "../../api/place";

export default function ModelHomePage() {
  const navigate = useNavigate();
  const {
    setConditionBooking,
    setCheckIn_date,
    checkIn_date,
    checkOut_date,
    setCheckOut_date,
    num_guests,
    setNum_guests,
    setAllFilterPlaces,
  } = usePlace();

  const handleOnSreach = (checkIn_date, checkOut_date, num_guests) => {
    if (checkIn_date && checkOut_date && num_guests) {
      // console.log("num_guests", num_guests);

      setConditionBooking(true);
      navigate(`/${checkIn_date}/${checkOut_date}`);
      placeApi
        .getAllFilterPlace(checkIn_date, checkOut_date, num_guests)
        .then((res) => setAllFilterPlaces(res.data.filterPlaces))
        .catch((err) => console.log(err));
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
                placeholder="number of guests"
              />
            </div>
            <button
              onClick={() =>
                handleOnSreach(checkIn_date, checkOut_date, num_guests)
              }
              className="primary"
            >
              Sreach for booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
