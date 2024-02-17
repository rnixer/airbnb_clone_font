import React from "react";
import { usePlace } from "../../contexts/PlaceContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PlaceItem({ place }) {
  const { property_name, image, description, id } = place;
  const { deletePlace, setOnFetch } = usePlace();
  const navigate = useNavigate();
  const handleOnDelete = async (id) => {
    try {
      // console.log(id);
      await deletePlace(id);
      setOnFetch((c) => !c);
      toast.success("deleted success");
    } catch (error) {
      toast.error(error.response?.data.msg);
    }
  };

  const handleToEditPage = async (id) => {
    try {
      navigate(`/account/places/account/places/${id}`);
    } catch (error) {}
  };

  return (
    <div className="flex gap-10 border rounded-xl w-4/5 mx-auto px-10 py-5 ">
      <img src={image} alt="place" className="text-green-500"></img>

      <div className="flex flex-col w-full">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold">{property_name}</h1>
          <div className="flex ">
            <div
              className="mr-10 mt-5 text-xl cursor-pointer"
              onClick={() => handleToEditPage(id)}
            >
              Edit
            </div>
            <div
              onClick={() => handleOnDelete(id)}
              className="mr-10 mt-5 font-bold text-xl cursor-pointer"
            >
              &#10005;
            </div>
          </div>
        </div>
        <div>
          <div className="">description {description}</div>
        </div>
      </div>
    </div>
  );
}
