import { useState } from "react";

const Hero = ({ submitData, emptyData }) => {
  const [form, setForm] = useState({
    country: "",
  });

  const handleSubmit = () => {
    if (form.country != "") {
      console.log("ini Form Search", form);
      submitData(form);
    } else {
      emptyData(form);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="px-8 py-24 sm:p-24 ">
      <div className="text-white pb-24 relative">
        <h1 className="font-bold text-5xl">Explore</h1>
        <h1 className="font-light text-5xl">your amazing city together</h1>
      </div>
      <div className="flex flex-col relative">
        <label htmlFor="search" className="text-white font-normal">
          Find great places to holiday
        </label>
        <div className="mt-2 w-full shadow-lg">
          <input
            onChange={handleChange}
            name="country"
            type="search"
            id="search"
            placeholder="Example: Jepang, Indonesia, Korea"
            className="p-2.5 border border-white focus:ring-yellow-300 focus:border-yellow-300 rounded-l-md w-11/12 placeholder-gray-500"
          />
          <button
            onClick={handleSubmit}
            className="absolute border border-yellow-300 px-6 py-2.5 bg-yellow-300 hover:bg-yellow-400 hover:border-yellow-400 text-white font-semibold rounded-r-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
