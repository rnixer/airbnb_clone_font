import { usePlace } from "../../contexts/PlaceContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PlaceItem({ myPlace }) {
  const { property_name, image, description, address, id } = myPlace;
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

  const handleToEditPage = (id) => {
    try {
      navigate(`/account/places/account/places/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 border rounded-xl w-4/5 mx-auto px-10 py-5 ">
      <img
        src={image}
        alt="place"
        className="text-green-500 rounded-2xl w-1/4"
      ></img>

      <div className="flex flex-col w-full h-2/5">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold mt-5">{property_name}</h1>
          <div className="flex gap-8 m-5 ">
            <div
              className=" text-xl cursor-pointer"
              onClick={() => handleToEditPage(id)}
            >
              Edit
            </div>
            <div
              onClick={() => handleOnDelete(id)}
              className=" font-bold text-xl cursor-pointer"
            >
              &#10005;
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <div className="">{address}</div>
        </div>

        <div>
          <div className="mt-3 text-lg"> {description}</div>
        </div>
      </div>
    </div>
  );
}
