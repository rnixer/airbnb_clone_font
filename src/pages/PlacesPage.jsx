import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../component/input";
import { useState } from "react";
import Peaks from "./Peaks";
import axios from "axios";

export default function PlacesPage() {
  // console.log(action);

  // async function addPhotoByLink(e) {
  //   e.preventDefault();
  //   await axios.post("/places/upload-by-link", {
  //     link: photoLink,
  //   });
  // }

  return (
    <div>
      {/* {action !== "new" && (
      
      )} */}

      <div className="text-center">
        <Link //inline-flex = display : inline-block
          className="flex inline-flex bg-red text-white py-2 px-6 rounded-full"
          to={"account/places/new"}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      {/* {action === "new" && (
       
      )} */}
    </div>
  );
}
