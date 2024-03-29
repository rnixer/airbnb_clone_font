import React from "react";

export default function PaymentConfirmItem({ payment }) {
  const { property_name, slipImage } = payment;

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
          <div className="mt-3">total_price </div>
        </div>
      </div>
    </div>
  );
}
