import { Navbars } from "../components/navbar";
import Logo from "../assets/images/dewe-logo-black.png";
import Qr from "../assets/images/qr-code.png";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTrip = () => {
  let { data: transactions } = useQuery("listTransactionCache", async () => {
    const response = await API.get("/my-transaction");
    return response.data.data;
  });

  const navigate = useNavigate();

  const handleBuy = useMutation(async (id) => {
    try {
      const response = await API.get(`/getpayment/${id}`);
      console.log("ini response", response);

      const token = response.data.data.token;
      console.log("ini token", token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/my-trip");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/my-trip");
        },
        onError: function (result) {
          console.log(result);
          navigate("/my-trip");
        },
        onClose: function () {
          alert("Close popup Cuy");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div>
      <Navbars />
      <div className="mt-20">
        <div className="mb-32 w-3/4 m-auto">
          <p className="text-[35px] font-semibold">History Trip</p>
          {transactions?.map((data, index) => {
            return (
              <>
                {data?.status === "Approve" ? null : (
                  <div key={data?.id} className="mb-20">
                    <div className="h-[410px] mt-8 w-full border-2 rounded-md border-gray-300 shadow-lg">
                      <div className="flex justify-between px-4 py-2">
                        <div className="mb-8">
                          <img className="w-[200px]" src={Logo} />
                          <div className="flex mt-4">
                            <div className="me-4">
                              <p className="text-[22px] font-semibold">
                                {data?.trip.title}
                              </p>
                              <p className="text-[15px] text-gray-400">
                                {data?.trip.country.name}
                              </p>
                              <p className="mt-8 px-4 py-2 text-[14px] text-[#EC7A7A] bg-[#FEF2F2] rounded-md w-[150px]">
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
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleBuy.mutate(data?.id)}
                        className="bg-[#FFAF00] hover:bg-yellow-300 px-20 mt-8 justify-end rounded-md py-2 text-white text-[18px]"
                      >
                        PAY
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <footer className="py-2 text-center bg-[#FFAF00] mt-auto text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
    </div>
  );
};

export default MyTrip;
