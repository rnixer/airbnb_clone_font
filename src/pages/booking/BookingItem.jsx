import React from "react";

export default function BookingItem({ booking }) {
  const { property, payment, checkin_date, checkout_date, total_price } =
    booking;

  const checkInDate = new Date(checkin_date).toISOString().split("T")[0];
  const checkOutDate = new Date(checkout_date).toISOString().split("T")[0];
  const totalNight =
    Math.abs(new Date(checkout_date) - new Date(checkin_date)) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="flex gap-10 bg-white shadow-md border rounded-xl w-3/5 mx-auto px-10 py-5 ">
      <img
        src={property.image}
        alt="place"
        className="text-green-500 rounded-2xl w-1/4"
      ></img>

      <div className="flex flex-col w-4/5 h-2/5 ml-14  gap-4">
        <h1 className="text-2xl font-bold mt-5">{property.property_name}</h1>
        <div className="flex gap-5 mt-5">
          <div className="text-xl font-bold"> {totalNight} Night</div>
          <div className="mt-1">Check-in date : {checkInDate} </div>
          <div className="mt-1">Check-out date : {checkOutDate} </div>
        </div>
        <div className="flex gap-5">
          <div className="text-xl ">
            <span className="font-bold">Total Price :</span> {total_price} Bath
          </div>
        </div>
        <div className="text-xl font-bold">
          Payment Status :{" "}
          {payment.status == "PENDING" ? (
            <span className="border bg-gray-200 rounded-md ml-3 px-3 py-1 font-bold">
              {" "}
              {payment.status}
            </span>
          ) : (
            <span className="border bg-green-500 text-white rounded-md ml-3 px-3 py-1 font-bold">
              {" "}
              {payment.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
