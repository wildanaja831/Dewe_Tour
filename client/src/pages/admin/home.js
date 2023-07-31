import { Table } from "flowbite-react";
import { Navbars } from "../../components/navbar";
import Detail from "../../assets/images/detail-invoice-admin.png";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useState } from "react";
import DetailTransAdmin from "../../components/modals/detail-trans-admin";

const HomeAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transId, setTransId] = useState();
  let { data: transactions } = useQuery("listTransactionCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <div>
      <Navbars />
      <div className="my-16">
        <div className="w-3/4 m-auto">
          <p className="text-[22px] font-semibold">Income Transaction</p>
          <div className="my-4">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Users</Table.HeadCell>
                <Table.HeadCell>Trip</Table.HeadCell>
                <Table.HeadCell>Status Payment</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {transactions?.map((data, index) => {
                  return (
                    <Table.Row
                      key={data.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{data?.user.fullname}</Table.Cell>
                      <Table.Cell>{data?.trip.title}</Table.Cell>
                      {data?.status === "Approve" ? (
                        <Table.Cell className="text-green-500">
                          {data?.status}
                        </Table.Cell>
                      ) : (
                        <Table.Cell className="text-red-600">
                          {data?.status}
                        </Table.Cell>
                      )}
                      <Table.Cell>
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setTransId(data?.id);
                          }}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          <img src={Detail} />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <footer className="py-2 text-center bg-[#FFAF00] mt-[300px] text-white">
        Copyright @ 2020 Dewe Tour - Muhammad Wildan Firdaus - NIS. All Rights
        reserved
      </footer>
      <DetailTransAdmin
        openModal={openModal}
        setOpenModal={setOpenModal}
        id={transId}
      />
    </div>
  );
};

export default HomeAdmin;
