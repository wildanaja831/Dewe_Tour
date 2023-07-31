import { useQuery } from "react-query";
import { Navbars } from "../../components/navbar";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";

const IncomeTrip = () => {
  const navigate = useNavigate();
  let { data: trips } = useQuery("incomeTripsCache", async () => {
    const response = await API.get("/trips");
    return response.data.data;
  });

  return (
    <>
      <Navbars />
      <div className=" py-16 w-4/5 m-auto">
        <div className="flex justify-between py-6">
          <p className="font-semibold text-[35px] items-center py-2">
            Income Trip
          </p>
          <button
            onClick={() => navigate("/add-trip")}
            className="bg-[#FFAF00] hover:bg-yellow-300 px-6 py-2 my-4 rounded-md text-white "
          >
            Add Trip
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 lg:grid-cols-3 gap-14 text-start">
          {trips?.map((data) => (
            <div
              key={data.id}
              className="p-2 rounded-md shadow-lg relative hover:border-yellow-300 border-2 border-white hover:cursor-pointer"
            >
              <div>
                <img
                  className="w-full rounded-md object-cover"
                  src={data.image}
                />
                <p className="px-3 py-2 bg-white absolute rounded-l-md right-[8px] top-[30px]">
                  10/{data.quota}
                </p>
              </div>
              <p className="text-[18px] mt-4 mb-2 truncate px-2">
                {data.title}
              </p>
              <div className="flex justify-between px-2">
                <p className="text-[#FFAF00] font-semibold">
                  <FormatRupiah value={data.price} />
                </p>
                <p className="text-[#878787] font-semibold">
                  {data.country.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="py-2 text-center bg-[#FFAF00] mt-[300px] text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
    </>
  );
};

export default IncomeTrip;
