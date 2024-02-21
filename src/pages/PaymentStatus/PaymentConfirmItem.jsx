import React from "react";
import { usePayment } from "../../contexts/PaymentContext";
import { toast } from "react-toastify";

export default function PaymentConfirmItem({ payment }) {
  const { property_name, slipImage, total_price, name, status, paymentId } =
    payment;
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

  return (
    <div className="flex gap-10 border rounded-xl w-4/5 mx-auto px-10 py-5 ">
      <img
        src={slipImage}
        alt="place"
        className="text-green-500 rounded-2xl w-1/4"
      ></img>

      <div className="flex flex-col w-full h-2/5">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold mt-5"></h1>
        </div>
        <div>
          <div className="mt-3">{property_name}</div>
          <div>{status}</div>
          <div className="mt-3 text-xl font-bold">{total_price} Bath </div>
          <div className="text-gray-400">
            Booking made by <span className="text">: {name}</span>
          </div>
          {status == "PENDING" ? (
            <div className="flex gap-6">
              <button className="bg-green-400 rounded-xl px-5 py-1 text-white hover:bg-green-500">
                Accept
              </button>
              <button
                className="bg-red rounded-xl px-5 py-1 text-white hover:bg-hv"
                onClick={handleOnReject}
              >
                Reject
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
