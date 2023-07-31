import { Navbars } from "../components/navbar";
import Country1 from "../assets/images/country7.png";
import Country2 from "../assets/images/country2.png";
import Country3 from "../assets/images/country3.png";
import Country4 from "../assets/images/country4.png";
import Hotel from "../assets/images/hotel-detail.png";
import Plane from "../assets/images/plane-detail.png";
import Eat from "../assets/images/meal-detail.png";
import Duration from "../assets/images/duration-detail.png";
import Dates from "../assets/images/calendar-detail.png";
import Minus from "../assets/images/minus-detail.png";
import Plus from "../assets/images/plus-detail.png";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PopUpListTransaction from "../components/modals/popup-payment";

const DetailTrip = () => {
  const [counter, setCounter] = useState(1);
  const [show, setShow] = useState(false);
  const handlerPlus = () => {
    setCounter(counter + 1);
  };

  const handlerMinus = () => {
    setCounter(counter - 1);
  };

  let p = useParams();
  let id = parseInt(p.id);
  let { data: trips } = useQuery("detailTripsCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });

  setAuthToken(localStorage.token);

  const handleBuy = async () => {
    try {
      let form = new FormData();
      form.set("trip_id", trips.id);
      form.set("counterQty", counter);
      const response = await API.post("/transaction", form);
      setShow(true);
      return response.data.data;
    } catch (error) {
      console.log("Gagal Membeli!!", error);
    }
  };

  return (
    <div>
      <Navbars />
      <div className="w-3/4 m-auto my-12">
        <div className="mx-4 mb-8">
          <p className="text-[48px] font-semibold">{trips?.title}</p>
          <p className="text-gray-400 text-[18px] font-mono font-semibold">
            {trips?.country.name}
          </p>
        </div>
        <div className="my-4">
          <img
            className="w-full h-[500px] object-cover rounded-md"
            src={Country1}
          />
          <div className="grid grid-cols-3 gap-3 mt-4">
            <img
              className="w-full object-cover rounded-md h-[200px]"
              src={Country2}
            />
            <img
              className="w-full object-cover rounded-md h-[200px]"
              src={Country3}
            />
            <img
              className="w-full object-cover rounded-md h-[200px]"
              src={Country4}
            />
          </div>
          <p className="font-semibold mt-12 mb-4 text-[18px]">
            Information Trip
          </p>
          <div className="my-6">
            <div className="flex">
              <p className="text-gray-400">Accomodation</p>
              <p className="text-gray-400 ms-[100px]">Transportation</p>
              <p className="text-gray-400 ms-[110px]">Eat</p>
              <p className="text-gray-400 ms-[225px]">Duration</p>
              <p className="text-gray-400 ms-[160px]">Date Trip</p>
            </div>
            <div className="flex my-2">
              <div className="text-[18px] flex font-semibold me-[60px]">
                <img src={Hotel} />
                <p className="text-[18px] ms-2 font-semibold">
                  {trips?.accomodation}
                </p>
              </div>
              <div className="text-[18px] flex font-semibold me-[45px]">
                <img src={Plane} />
                <p className="w-[150px] text-[18px] ms-2 font-semibold">
                  {trips?.transportation}
                </p>
              </div>
              <div className="text-[18px] flex font-semibold me-[65px]">
                <img src={Eat} />
                <p className="w-[150px] text-[18px] ms-2 font-semibold">
                  {trips?.eat}
                </p>
              </div>
              <div className="text-[18px] flex font-semibold me-[45px]">
                <img src={Duration} />
                <p className="w-[150px] text-[18px] ms-2 font-semibold">
                  {trips?.day} Days {trips?.night} Nights
                </p>
              </div>
              <div className="text-[18px] flex font-semibold">
                <img src={Dates} />
                <p className="w-[150px] text-[18px] ms-2 font-semibold">
                  {trips?.dateTrip}
                </p>
              </div>
            </div>
          </div>
          <div className="my-8">
            <p className="text-[18px] font-semibold">Description</p>
            <p className="text-gray-400 whitespace-normal">
              {trips?.description}
            </p>
          </div>
          <div className="flex justify-between my-4 mx-2">
            <div className="flex">
              <p className="text-[22px] me-4 font-semibold text-[#FFAF00]">
                IDR. {trips?.price}
              </p>
              <p className="text-[22px] font-semibold">/ Person</p>
            </div>
            <div className="flex">
              {counter <= 1 ? (
                <button
                  disabled
                  onClick={handlerMinus}
                  className="px-2 py-2 bg-[#FFAF00] hover:bg-yellow-300 mx-2 rounded-md"
                >
                  <img src={Minus} />
                </button>
              ) : (
                <button
                  onClick={handlerMinus}
                  className="px-2 py-2 bg-[#FFAF00] hover:bg-yellow-300 mx-2 rounded-md"
                >
                  <img src={Minus} />
                </button>
              )}
              <p className="font-semibold text-[18px] p-2 w-10 text-center">
                {counter}
              </p>
              {trips?.quota <= counter ? (
                <button
                  disabled
                  onClick={handlerPlus}
                  className="px-2 py-2 bg-[#FFAF00] hover:bg-yellow-300 mx-2 rounded-md"
                >
                  <img src={Plus} />
                </button>
              ) : (
                <button
                  onClick={handlerPlus}
                  className="px-2 py-2 bg-[#FFAF00] hover:bg-yellow-300 mx-2 rounded-md"
                >
                  <img src={Plus} />
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between p-2 border-t-2 border-b-2">
            <p className="text-[22px] font-semibold">Total :</p>
            <p className="text-[22px] font-semibold text-[#FFAF00]">
              IDR. {trips?.price}
            </p>
          </div>
          <div className="flex justify-end mt-8 me-2">
            <button
              onClick={() => handleBuy()}
              className="bg-[#FFAF00] hover:bg-yellow-300 rounded-md text-white px-8 py-2 "
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
      <footer className="py-2 text-center bg-[#FFAF00] mt-auto text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
      <PopUpListTransaction show={show} setShow={setShow} />
    </div>
  );
};

export default DetailTrip;
