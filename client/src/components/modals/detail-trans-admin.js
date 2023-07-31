import { Modal } from "flowbite-react";
import Logo from "../../assets/images/dewe-logo-black.png";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Qr from "../../assets/images/qr-code.png";

const DetailTransAdmin = (props) => {
  let { data: transactions } = useQuery(
    "detailTransactionAdminCache",
    async () => {
      const response = await API.get(`/transactions`);
      return response.data.data;
    }
  );

  return (
    <Modal
      className=""
      dismissible
      show={props.openModal}
      size={"5xl"}
      onClose={() => props.setOpenModal(false)}
    >
      <Modal.Body className="p-0 m-0">
        {transactions
          ?.filter((transaksi) => transaksi.id === props.id)
          ?.map((data) => {
            return (
              <div
                key={data?.id}
                className="h-[410px] w-full border-2 rounded-md border-gray-300 shadow-lg"
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
                        {data?.status === "Approve" ? (
                          <p className="mt-8 px-4 py-2 text-[14px] text-[#52EC6E] bg-[#EAFEEA] rounded-md w-[90px]">
                            {data?.status}
                          </p>
                        ) : (
                          <p className="mt-8 px-4 py-2 text-[14px] text-red-600 bg-[#FEF2F2] rounded-md w-[150px]">
                            {data?.status}
                          </p>
                        )}
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
                              {data?.trip.day} Day {data?.trip.night} Night
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold">Transportation</p>
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
                  <p className="ms-[160px] text-[18px] font-semibold">Gender</p>
                  <p className="ms-[80px] text-[18px] font-semibold">Phone</p>
                </div>
                <div className="flex py-2 border-b-2 justify-between">
                  <div className="flex">
                    <p className="ms-4 px-2 text-[18px] text-gray-400">
                      {data?.id}
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
                    <p className="ms-[30px] text-[18px]">{data?.counterQty}</p>
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
            );
          })}
      </Modal.Body>
    </Modal>
  );
};

export default DetailTransAdmin;
