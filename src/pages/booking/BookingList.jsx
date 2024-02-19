import React from "react";
import BookingItem from "./BookingItem";
import { useBooking } from "../../contexts/BookingContext";

export default function BookingList() {
  const { bookedList } = useBooking();

  return (
    <div className="flex flex-col gap-10">
      {bookedList.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
