import React from "react";
import { useAuth } from "../feature/auth/contexts/AuthContext";
import Spinner from "../component/Spinner";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PlacesPage from "./places/PlacesPage";
import { usePlace } from "../contexts/PlaceContext";
import BookingListPage from "../pages/booking/BookingListPage";
import PaymentConfirmList from "./PaymentStatus/PaymentConfirmList";

export default function AccountPage() {
  const { user, initialLoading, logout } = useAuth();
  const { setCheckIn_date, setCheckOut_date, setNum_guests } = usePlace();

  let { subpage } = useParams();
  // console.log(subpage);
  // console.log(useParams());
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (initialLoading) {
    return <Spinner />;
  }

  if (!initialLoading && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 bg-gray-300 rounded-full inline-flex flex gap-2";
    if (type === subpage) {
      classes += " bg-red rounded-full text-white";
    }
    return classes;
  }

  const handleOnLogout = () => {
    setCheckIn_date();
    setCheckOut_date();
    setNum_guests();
    logout();
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("booking")} to={"/account/booking"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          My booking
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My accommodation
        </Link>
        <Link className={linkClasses("payment")} to={"/account/payment"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
          Payment status
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} {user.email} <br></br>
          <button
            className="primary max-w-sm mt-2 hover:bg-hv"
            onClick={handleOnLogout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
      {subpage === "booking" && <BookingListPage />}
      {subpage === "payment" && <PaymentConfirmList />}
    </div>
  );
}
