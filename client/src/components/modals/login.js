"use client";
import { Label, Modal, TextInput } from "flowbite-react";
import Bg1 from "../../assets/images/hibiscus-modal.png";
import Bg2 from "../../assets/images/palm-modal.png";
import { API, setAuthToken } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";

const LoginModal = (props) => {
  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handlerSwitch = () => {
    props.setOpenModal(undefined);
    props.setRegister("initial-focus");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/login", form, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.role === "admin") {
        alert("Selamat Datang Admin!!");
        navigate("/admin");
      } else {
        alert("Selamat Datang User!!");
        navigate("/");
      }

      setForm({
        username: "",
        password: "",
      });

      props.setOpenModal(undefined);
    } catch (err) {
      console.log("login failed : ", err);
    }
  });

  return (
    <div>
      <Modal
        show={props.openModal === "initial-focus"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
        dismissible
      >
        <Modal.Body className="pt-14">
          <img className="absolute right-0 top-0 rounded-r-md" src={Bg1} />
          <img className="absolute left-0 top-0" src={Bg2} />
          <div className="space-y-6 ">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Login
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
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
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            <div className="w-full">
              <button
                onClick={(e) => handleSubmit.mutate(e)}
                className="w-full bg-[#FFAF00] hover:bg-yellow-300 py-2 rounded-md text-white"
              >
                Login
              </button>
            </div>
            <div className="flex text-[#B1B1B1] justify-center">
              <p className="">Don't have an account? Klik</p>
              <span
                onClick={handlerSwitch}
                className="font-semibold cursor-pointer ms-1"
              >
                here
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginModal;
