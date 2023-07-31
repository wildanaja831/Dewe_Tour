import { Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const AddCountryModal = (props) => {
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/country", form, config);

      setForm({
        name: "",
      });
      alert("Create Country Success!!");
      props.setOpenModal(undefined);
    } catch (err) {
      console.log("Create Country Failed : ", err);
    }
  });
  return (
    <>
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Body>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <p className="text-center text-[25px] font-semibold">
              Add New Country
            </p>
            <div className="my-4">
              <Label className="text-[18px]" htmlFor="name">
                Country Name
              </Label>
              <TextInput
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="me-4 px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-md"
              >
                ADD
              </button>
              <button
                className=" px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => props.setOpenModal(undefined)}
              >
                CLOSE
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCountryModal;
