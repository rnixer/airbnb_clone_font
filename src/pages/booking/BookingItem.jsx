import React from "react";

export default function BookingItem({ booking }) {
  const { property, image, checkin_date, total_price } = booking;

  return (
    <div className="flex gap-10 border rounded-xl w-4/5 mx-auto px-10 py-5 ">
      <img
        src={property.image}
        alt="place"
        className="text-green-500 rounded-2xl w-1/4"
      ></img>

      <div className="flex flex-col w-full h-2/5">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold mt-5">{property.property_name}</h1>
        </div>
        <div>
          <div className="mt-3">checkin_date {checkin_date}</div>
          <div className="mt-3">total_price {total_price}</div>
        </div>
      </div>
    </div>
  );
}
