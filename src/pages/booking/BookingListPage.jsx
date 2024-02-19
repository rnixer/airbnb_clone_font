import React from "react";
import { Link } from "react-router-dom";
import BookingList from "./BookingList";

export default function BookingListPage() {
  return (
    <div>
      <div className="text-center mb-10"></div>
      <BookingList />
    </div>
  );
}
