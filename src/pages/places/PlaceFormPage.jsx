import React from "react";
import Input from "../../component/input";
import { useState } from "react";
import Peaks from "../Peaks";
import { usePlace } from "../../contexts/PlaceContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import Spinner from "../../component/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function PlaceFormPage() {
  const { editPlace, myPlaces, createPlace, setOnFetch } = usePlace();
  const navigate = useNavigate();

  const { placeId } = useParams();
  const a = myPlaces.find((e) => e.id == placeId);

  const [isEdit, setIsEdit] = useState(false);

  const [property_name, setProperty_name] = useState(a?.property_name);
  const [address, setAddress] = useState(a?.address);
  const [image, setImage] = useState(a?.image);
  const [showImage, setShowImage] = useState(null);
  const [description, setDescription] = useState(a?.description);
  const [num_guests, setNum_guests] = useState(a?.num_guests);
  const [nightly_price, setNightly_price] = useState(a?.nightly_price);
  const [mobile_promptpay, setMobile_promptpay] = useState(a?.mobile_promptpay);
  const [loading, setLoading] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);

  // const [error, setError] = useState("");

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

  useEffect(() => {
    if (placeId) {
      setIsEdit(true);
    }
  }, [placeId]);

  useEffect(() => {
    if (showImage) {
      setIsNewImage(true);
    } else {
      setIsNewImage(false);
    }
  }, [showImage]);
  const handleOnEdit = async (e) => {
    // console.log("property_name", property_name);

    try {
      e.preventDefault();

      if (!/^\d{10}$/.test(mobile_promptpay.trim())) {
        return toast.error(
          "Mobile promptpay number must have 10 character number Ex. 08xxxxxxxx"
        );
      }

      if (!/^\d+$/.test(nightly_price.trim())) {
        return toast.error("Nightly price must be a number.");
      }

      if (num_guests <= 0) {
        return toast.error("Max number of guests must more than 0");
      }

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
      if (image) {
        formData.append("image", image);
      }
      console.log("formData", formData);
      setLoading(true);
      await editPlace(formData, +placeId);
      toast.success("Edit place information success");
      setOnFetch((c) => !c);
      navigate("/account/places");
    } catch (error) {
      toast.error(error.response?.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOnCreate = async (e) => {
    try {
      e.preventDefault();
      if (
        !property_name &&
        !address &&
        !description &&
        !num_guests &&
        !nightly_price &&
        !mobile_promptpay &&
        !image
      ) {
        return toast.error("please enter anything");
      }

      if (!property_name || !nightly_price || !mobile_promptpay) {
        return toast.error(
          "Property must have please property name and nightly price and mobile promptpay"
        );
      }

      if (!/^\d{10}$/.test(mobile_promptpay.trim())) {
        return toast.error(
          "Mobile promptpay number must have 10 character number Ex. 08xxxxxxxx"
        );
      }

      if (!/^\d+$/.test(nightly_price.trim())) {
        return toast.error("Nightly price must be a number.");
      }

      if (num_guests <= 0) {
        return toast.error("Max number of guests must more than 0");
      }

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
      if (image) {
        formData.append("image", image);
      }

      // console.log("formData:", formData);
      setLoading(true);
      await createPlace(formData);
      toast.success("create place success");
      setOnFetch((c) => !c);
      navigate("/account/places");
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
        <form>
          {preInput("Title", "Title for your place")}
          <Input
            value={property_name || ""}
            onChange={(e) => setProperty_name(e.target.value)}
            type="text"
            placeholder="title, for example: My lovely apartment"
          ></Input>
          {preInput("Address", "Address to this place")}

          <Input
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="address"
          ></Input>
          {preInput("Photos", "")}

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <input
              className="hidden"
              type="file"
              ref={fileInputEl}
              onChange={(e) => {
                if (e.target.files[0]) {
                  console.log(e.target.files);
                  setImage(e.target.files[0]);
                  setShowImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            {image ? (
              <>
                {" "}
                {isNewImage ? (
                  <>
                    <div
                      className={"relative flex justify-center "}
                      onClick={() => fileInputEl.current.click()}
                    >
                      <img src={showImage} alt="image" />
                      <div
                        className="absolute top-1 right-5 text-2xl font-black cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setImage(null);
                          setShowImage(null);
                          fileInputEl.current.value = "";
                        }}
                      >
                        &#10005;
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="relative flex justify-center "
                      onClick={() => fileInputEl.current.click()}
                    >
                      <img src={image} alt="image" />
                      <div
                        className="absolute top-1 right-5 text-2xl font-black cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setImage(null);
                          fileInputEl.current.value = "";
                        }}
                      >
                        &#10005;
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          {/* bg-transparent คือสีโปร่งใส*/}
          {preInput("Description", "Description of this place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* <Peaks /> */}

          {preInput(
            "Check in&out times, max guests",
            "add check in and out times"
          )}

          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3>Max number of guests</h3>
              <Input
                value={num_guests || ""}
                onChange={(e) => setNum_guests(e.target.value)}
                type="number"
                placeholder=""
              />
            </div>
            <div>
              <h3>Price per night</h3>
              <Input
                value={nightly_price || ""}
                onChange={(e) => setNightly_price(e.target.value)}
                type="text"
                placeholder=""
              />
            </div>
          </div>

          {preInput("Mobile promptpay", "mobile number for receive payment")}
          <Input
            value={mobile_promptpay || ""}
            onChange={(e) => setMobile_promptpay(e.target.value)}
            type="text"
            placeholder=""
          />
          <div>
            {isEdit ? (
              <button
                onClick={handleOnEdit}
                className="primary my-4 hover:bg-hv"
              >
                Save change
              </button>
            ) : (
              <button
                onClick={handleOnCreate}
                className="primary my-4  hover:bg-hv"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
