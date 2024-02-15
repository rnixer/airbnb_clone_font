import React from "react";
import { Link } from "react-router-dom";
import Input from "../component/input";
import { useState } from "react";
import Peaks from "./Peaks";
import axios from "axios";
import { usePlace } from "../contexts/PlaceContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import Spinner from "../component/Spinner";

export default function PlaceFormPage() {
  const [property_name, setProperty_name] = useState("");
  const [address, setAddress] = useState("");
  // const [photoLink, setAddedPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  // const [extraInfo, setExtraInfo] = useState("");
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  const [num_guests, setNum_guests] = useState(1);
  const [nightly_price, setNightly_price] = useState("");
  const [mobile_promptpay, setMobile_promptpay] = useState("");
  const [loading, setLoading] = useState(false);

  const { createPlace } = usePlace();

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const fileInputEl = useRef(null);

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (property_name) {
        formData.append("property_name", property_name);
      }
      if (address) {
        formData.append("address", address);
      }
      if (description) {
        formData.append("description", description);
      }
      if (num_guests) {
        formData.append("num_guests", num_guests);
      }
      if (nightly_price) {
        formData.append("nightly_price", nightly_price);
      }
      if (mobile_promptpay) {
        formData.append("mobile_promptpay", mobile_promptpay);
      }
      if (mobile_promptpay) {
        formData.append("image", image);
      }

      // console.log("formData:", formData);
      setLoading(true);
      await createPlace(formData);
      toast.success("create place success");
    } catch (error) {
      toast.error(error.response?.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div>
        <form onSubmit={handleSubmitForm}>
          {preInput("Title", "Title for your place")}
          <Input
            value={property_name}
            onChange={(e) => setProperty_name(e.target.value)}
            type="text"
            placeholder="title, for example: My lovely apartment"
          ></Input>
          {preInput("Address", "Address for your place")}

          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="address"
          ></Input>
          {preInput("Photos", "")}
          {/* <div className="flex gap-2">
          <Input
            value={photoLink}
            onChange={(e) => setAddedPhotos(e.target.value)}
            type="text"
            placeholder="Add using a link ...jpg"
          ></Input>
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-2xl"
          >
            Add&nbsp;photo{" "}
         
          </button>
        </div> */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <input
              className="hidden"
              type="file"
              ref={fileInputEl}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            {image ? (
              <div className="relative flex justify-center">
                <img src={URL.createObjectURL(image)} alt="place"></img>
                <button
                  className="absolute top-1 right-10 text-2xl font-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    fileInputEl.current.value = "";
                  }}
                >
                  &#10005;
                </button>
              </div>
            ) : null}

            <div
              onClick={() => fileInputEl.current.click()}
              className="flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
            </div>
          </div>
          {/* bg-transparent คือสีโปร่งใส*/}
          {preInput("Description", "Description of this place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Peaks />

          {/* {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        /> */}

          {preInput(
            "Check in&out times, max guests",
            "add check in and out times"
          )}

          <div className="grid gap-2 sm:grid-cols-3">
            {/* <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <Input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="11"
            />
          </div> */}
            {/* <div>
            <h3>Check out time</h3>
            <Input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="14"
            />
          </div> */}
            <div>
              <h3>Max number of guests</h3>
              <Input
                value={num_guests}
                onChange={(e) => setNum_guests(e.target.value)}
                type="number"
                placeholder=""
              />
            </div>
            <div>
              <h3>Price per night</h3>
              <Input
                value={nightly_price}
                onChange={(e) => setNightly_price(e.target.value)}
                type="text"
                placeholder=""
              />
            </div>
          </div>

          {preInput("Mobile promptpay", "mobile number for receive payment")}
          <Input
            value={mobile_promptpay}
            onChange={(e) => setMobile_promptpay(e.target.value)}
            type="text"
            placeholder=""
          />
          <div>
            {/* <Link to={"/account/places"}> */}
            <button className="primary my-4">Save</button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}
