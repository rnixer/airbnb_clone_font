import React from "react";
import { useAuth } from "../feature/auth/contexts/AuthContext";
import Spinner from "../component/Spinner";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AccountPage() {
  const { user, initialLoading, logout } = useAuth();

  let { subpage } = useParams();
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
    let classes = "py-2 px-6 bg-gray-300 rounded-full";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += " bg-red rounded-full text-white";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("booking")} to={"/account/booking"}>
          My booking
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodation
        </Link>
        <Link className={linkClasses("payment")} to={"/account/payment"}>
          Payment status
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br></br>
          <button className="primary max-w-sm mt-2" onSubmit={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
