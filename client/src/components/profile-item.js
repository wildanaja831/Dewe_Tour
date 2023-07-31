import Avatar from "../assets/images/Avatar.png";
import Personal from "../assets/images/personal-profile.png";
import Email from "../assets/images/email-profile.png";
import Phone from "../assets/images/phone-profile.png";
import Address from "../assets/images/location-profile.png";
import Logo from "../assets/images/dewe-logo-black.png";
import Qr from "../assets/images/qr-code.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import EditProfile from "./modals/edit-profile";
import { data } from "autoprefixer";

const ProfileItem = () => {
  const [showEdit, setShowEdit] = useState("");
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/myUser");
    return response.data.data;
  });

  let { data: transaction } = useQuery("transactionHistoryCache", async () => {
    const response = await API.get("/my-transaction");
    return response.data.data;
  });

  return (
    <div>
      <div className="flex lg:w-[750px] md:w-3/4 mx-auto mt-24 border-2 border-gray-300 shadow-lg p-6 rounded-md">
        <div className="flex-1 me-12">
          <p className="text-[38px] font-semibold">Personal info</p>
          <div className="flex mb-4 py-2 items-center mt-3">
            <img className="h-10 me-4" src={Personal} />
            <div>
              <p>{profile?.fullname}s</p>
              <p className="text-gray-400">Full Name</p>
            </div>
          </div>
          <div className="flex mb-4 py-2 items-center">
            <img className="h-7 me-5" src={Email} />
            <div>
              <p>{profile?.email}</p>
              <p className="text-gray-400">Email</p>
            </div>
          </div>
          <div className="flex mb-4 py-2 items-center">
            <img className="h-7 me-6" src={Phone} />
            <div>
              <p>{profile?.phone}</p>
              <p className="text-gray-400">Mobile Phone</p>
            </div>
          </div>
          <div className="flex mb-4 py-2 items-center">
            <img className="h-9 me-6" src={Address} />
            <div>
              <p className="font-semibold">{profile?.address}</p>
              <p className="text-gray-400">Address</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-9/10">
            <img
              className="w-[300px] h-[350px] shadow-md object-cover rounded-md"
              src={profile?.image}
            />
          </div>
          <button
            onClick={() => setShowEdit("dismissible")}
            className="px-4 py-2 rounded-md text-white w-full mt-2 bg-[#FFAF00] hover:bg-yellow-300"
          >
            Change Photo Profile
          </button>
        </div>
      </div>
      <div className="mt-20">
        <div className="w-3/4 m-auto mb-20">
          <p className="text-[35px] font-semibold">History Trip</p>
          <div>
            {transaction?.map((data, index) => {
              return (
                <>
                  {data?.status === "Approve" && (
                    <div
                      key={data?.id}
                      className="h-[410px] mt-8 w-full border-2 rounded-md border-gray-300 shadow-lg"
                    >
                      <div className="flex justify-between px-4 py-2">
                        <div className="mb-4">
                          <img className="w-[200px]" src={Logo} />
                          <div className="flex mt-4">
                            <div className="me-4">
                              <p className="text-[22px] font-semibold">
                                {data?.trip.title}
                              </p>
                              <p className="text-[15px] text-gray-400">
                                {data?.trip.country.name}
                              </p>
                              <p className="mt-8 px-4 py-2 text-[14px] text-[#52EC6E] bg-[#EAFEEA] rounded-md w-[90px]">
                                {data?.status}
                              </p>
                            </div>
                            <div className="flex">
                              <div className="mx-16">
                                <div className="mb-8">
                                  <p className="font-semibold">Date Trip</p>
                                  <p className="text-gray-400">
                                    {data?.trip.dateTrip}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold">Accomodation</p>
                                  <p className="text-gray-400">
                                    {data?.trip.accomodation}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="mb-8">
                                  <p className="font-semibold">Duration</p>
                                  <p className="text-gray-400">
                                    {data?.trip.day} Day {data?.trip.night}{" "}
                                    Night
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold">
                                    Transportation
                                  </p>
                                  <p className="text-gray-400">
                                    {data?.trip.transportation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right px-8">
                          <p className="text-[35px] font-semibold">Booking</p>
                          <p className="mb-8">
                            <span className="text-gray-400">Saturday</span>,{" "}
                            {data?.trip.dateTrip}
                          </p>
                          <img className="m-auto" src={Qr} />
                          <p className="text-center text-[20px]">TCK0101</p>
                        </div>
                      </div>
                      <div className="flex pb-2 border-b-2">
                        <p className="ms-4 text-[18px] font-semibold">No</p>
                        <p className="ms-[60px] text-[18px] font-semibold">
                          Full Name
                        </p>
                        <p className="ms-[160px] text-[18px] font-semibold">
                          Gender
                        </p>
                        <p className="ms-[80px] text-[18px] font-semibold">
                          Phone
                        </p>
                      </div>
                      <div className="flex py-2 border-b-2 justify-between">
                        <div className="flex">
                          <p className="ms-4 px-2 text-[18px] text-gray-400">
                            {index + 1}
                          </p>
                          <p className="ms-[60px] w-[180px] text-[18px]  text-gray-400">
                            {data?.user.fullname}
                          </p>
                          <p className="ms-[65px] w-[70px] text-[18px] text-gray-400">
                            {data?.user.gender}
                          </p>
                          <p className="ms-[70px] text-[18px] text-gray-400">
                            {data?.user.phone}
                          </p>
                        </div>
                        <div className="flex me-[160px]">
                          <p className="ms-[65px] w-[70px] text-[18px]">Qty</p>
                          <p className="ms-[50px] text-[18px]">:</p>
                          <p className="ms-[30px] text-[18px]">
                            {data?.counterQty}
                          </p>
                        </div>
                      </div>
                      <div className="flex float-right mt-2 me-[20px]">
                        <p className="ms-[65px] w-[70px] text-[18px]">Total</p>
                        <p className="ms-[50px] text-[18px]">:</p>
                        <p className="ms-[30px] w-[150px] text-[18px] font-semibold text-red-500">
                          IDR. {data?.total}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <EditProfile openModal={showEdit} setOpenModal={setShowEdit} />
      </div>
    </div>
  );
};

export default ProfileItem;
