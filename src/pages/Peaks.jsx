import Input from "../component/input";

export default function Peaks() {
  return (
    <div>
      {/* {preInput("Perks", "Select all the perks")} */}
      <h2 className="text-2xl mt-4">Perks</h2>
      <p className="text-gray-500 text-sm">Select all the perks</p>
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>Wifi</span>
        </label>
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>TV</span>
        </label>
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>Radio</span>
        </label>
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>Pets</span>
        </label>
        <label className="border p-4 rounded-2xl gap-2 items-center cursor-pointer">
          <Input type="checkbox" />
          <span>Private entrance</span>
        </label>
      </div>
    </div>
  );
}
