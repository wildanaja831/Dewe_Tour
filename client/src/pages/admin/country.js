import { Table } from "flowbite-react";
import { Navbars } from "../../components/navbar";
import Delete from "../../assets/images/delete-admin.png";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useEffect, useState } from "react";
import AddCountryModal from "../../components/modals/add-country";
import DeletePopUp from "../../components/modals/delete-popup";

const Country = () => {
  const [show, setShow] = useState();
  const [showDelete, setShowDelete] = useState();
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  let { data: countries, refetch } = useQuery("countriesCache", async () => {
    const response = await API.get("/country");
    return response.data.data;
  });

  const handleClose = () => setShowDelete(undefined);
  const handleShow = () => setShowDelete("pop-up");

  const handleDelete = (id) => {
    setDeleteId(id);
    handleShow();
  };

  const deletById = useMutation(async (id) => {
    try {
      await API.delete(`/country/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deletById.mutate(deleteId);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <Navbars />
      <div className="my-16">
        <div className="w-3/4 m-auto">
          <div className="flex justify-between">
            <p className="text-[22px] font-semibold">Countries List</p>
            <button
              onClick={() => setShow("dismissible")}
              className="bg-[#FFAF00] hover:bg-yellow-300 px-6 py-2 rounded-md text-white"
            >
              Add Country
            </button>
          </div>
          <div className="mt-8">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Country</Table.HeadCell>
                <Table.HeadCell className="float-right me-[100px]">
                  Action
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {countries?.map((data, index) => {
                  return (
                    <Table.Row
                      key={data.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{data?.name}</Table.Cell>
                      <Table.Cell className="float-right me-[110px]">
                        <button
                          onClick={() => handleDelete(data?.id)}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          <img className="w-[25px]" src={Delete} />
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
      <AddCountryModal openModal={show} setOpenModal={setShow} />
      <DeletePopUp
        openModal={showDelete}
        setConfirmDelete={setConfirmDelete}
        setOpenModal={setShowDelete}
      />
    </div>
  );
};

export default Country;
