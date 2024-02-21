import React from "react";
import { usePayment } from "../../contexts/PaymentContext";
import { toast } from "react-toastify";

export default function PaymentConfirmItem({ payment }) {
  const {
    property_name,
    slipImage,
    total_price,
    name,
    status,
    paymentId,
    checkin_date,
    checkout_date,
  } = payment;
  const { acceptOrReject, deleteBookingFailure, setOnFetch } = usePayment();

  const handleOnReject = async (e) => {
    try {
      // console.log("payment", payment);
      // console.log("paymentId", paymentId);
      const data = { status: "FAILURE" };
      // console.log("data", data);

      await acceptOrReject(data, paymentId);
      await deleteBookingFailure();
      toast.success("deleted success");
      setOnFetch((c) => !c);
    } catch (error) {
      toast.error(error.response?.data.msg);
    }
  };

  const handleOnAccept = async () => {
    try {
      const data = { status: "SUCCESSFUL" };

      await acceptOrReject(data, paymentId);
      toast.success("Accepted payment");
    } catch (error) {
      toast.error(error.response?.data.msg);
    }
  };

  const checkInDate = new Date(checkin_date).toISOString().split("T")[0];
  const checkOutDate = new Date(checkout_date).toISOString().split("T")[0];
  const totalNight =
    Math.abs(new Date(checkout_date) - new Date(checkin_date)) /
    (1000 * 60 * 60 * 24);
  return (
    <div className="flex gap-10  rounded-xl w-3/5 mx-auto px-16 py-8 mt-10 bg-white shadow-md border">
      <img
        src={slipImage}
        alt="place"
        className="text-green-500 rounded-2xl w-1/3"
      ></img>

      <div className="flex flex-col w-full h-2/5 ml-16">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold mt-5"></h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="mt-5 text-xl font-bold">{property_name}</div>
          {/* <div>{status}</div> */}

          <div className="flex gap-6 mt-5">
            <div className="text-lg font-bold">{totalNight} Night</div>
            <div className="mt-1 text-gray-400">
              {" "}
              check-in date : {checkInDate}
            </div>
            <div className="mt-1  text-gray-400">
              check-out date : {checkOutDate}
            </div>
          </div>
          <div className="mt-2 text-xl font-bold ">
            {" "}
            <span className="mt-3 text-xl font-bold mr-2">
              Total Payment :
            </span>{" "}
            {total_price} Bath{" "}
          </div>

          {status !== "SUCCESSFUL" ? (
            <div className="flex gap-6 mt-2 ">
              <button
                className="bg-green-400 rounded-xl px-5 py-1 text-xl text-white hover:bg-green-500"
                onClick={handleOnAccept}
              >
                Accept
              </button>
              <button
                className="bg-red rounded-xl px-5 py-1 text-xl text-white hover:bg-hv"
                onClick={handleOnReject}
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="text-green-600 text-2xl font-bold mt-2">
              Payment successful
            </div>
          )}

          <div className="text-gray-400 mt-1 text-lg">
            Booking made by <span className="text">: {name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
