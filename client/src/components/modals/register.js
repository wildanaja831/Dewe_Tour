"use client";
import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import Bg1 from "../../assets/images/hibiscus-modal.png";
import Bg2 from "../../assets/images/palm-modal.png";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const RegisterModal = (props) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchRegister = () => {
    props.setRegister(undefined);
    props.setLogin("initial-focus");
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/register", form, config);
      console.log("Register Success : ", response);

      setForm({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
      alert("Berhasil Register!!");
      handleSwitchRegister();
    } catch (err) {
      console.log("Register Failed : ", err);
    }
  });

  return (
    <div>
      <Modal
        show={props.show === "initial-focus"}
        size="lg"
        popup
        onClose={() => props.setRegister(undefined)}
        dismissible
      >
        <Modal.Body className="pt-14">
          <img className="absolute z-10 right-0 top-0 rounded-r-md" src={Bg1} />
          <img className="absolute z-10 left-0 top-0" src={Bg2} />
          <div className="space-y-6 relative z-50">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <div>
              <div className="mb-2 relative">
                <Label htmlFor="fullname" value="Fullname" />
              </div>
              <TextInput
                onChange={handleChange}
                name="fullname"
                type="text"
                id="fullname"
                required
              />
            </div>
            <div>
              <div className="mb-2 relative">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                required
              />
            </div>
            <div>
              <div className="mb-2 relative">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                required
              />
            </div>
            <div>
              <div className="mb-2 relative">
                <Label htmlFor="phone" value="Phone Number" />
              </div>
              <TextInput
                onChange={handleChange}
                name="phone"
                type="number"
                id="phone"
                required
              />
            </div>
            <div>
              <div className="mb-2 relative">
                <Label htmlFor="address" value="Address" />
              </div>
              <Textarea
                onChange={handleChange}
                name="address"
                rows={3}
                className="resize-none"
                id="address"
                required
              />
            </div>
            <div className="w-full">
              <button
                onClick={(e) => handleSubmit.mutate(e)}
                className="w-full bg-[#FFAF00] hover:bg-yellow-300 py-2 rounded-md text-white"
              >
                Register
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RegisterModal;
