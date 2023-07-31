"use client";
import { Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/images/logo-dewe.png";
import { useContext, useState } from "react";
import LoginModal from "./modals/login";
import RegisterModal from "./modals/register";
import { UserContext } from "./context/UserContext";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import Profile from "../assets/images/profile-dropdown.png";
import Pay from "../assets/images/pay-dropdown.png";
import Logout from "../assets/images/logout-dropdown.png";
import { useNavigate } from "react-router-dom";
import Income from "../assets/images/income-admin.png";

export const NavbarHome = () => {
  const [state, dispatch] = useContext(UserContext);
  const [openModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  console.log(state.user.role);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  setAuthToken(localStorage.token);

  let { data: profile } = useQuery("profileImageCache", async () => {
    const response = await API.get(`/myUser`);
    return response.data.data;
  });

  return (
    <div>
      <div className="absolute inset-0 w-full h-full bg-slate-950 bg-opacity-20" />
      <Navbar fluid className="bg-transparent md:px-24 relative">
        <Navbar.Brand className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} className="w-48" />
        </Navbar.Brand>
        {state.isLogin ? (
          <div>
            <Dropdown
              inline
              placement="bottom"
              label={
                <img
                  className="rounded-full w-11 h-11 ring-2 ring-[#FFAF00]"
                  src={profile?.image}
                />
              }
            >
              <p
                onClick={() => navigate("/profile")}
                className="flex px-6 py-3 text-[14px] hover:bg-slate-200 cursor-pointer my-auto font-semibold"
              >
                <img className="me-2 w-6" src={Profile} /> Profile
              </p>
              <p
                onClick={() => navigate("/my-trip")}
                className="flex px-6 py-3 text-[14px] border-b-2 hover:bg-slate-200 cursor-pointer my-auto font-semibold"
              >
                <img className="me-2 w-6" src={Pay} /> Pay
              </p>
              <p
                onClick={logout}
                className="flex px-6 py-3 text-[14px] hover:bg-slate-200 cursor-pointer my-auto font-semibold"
              >
                <img className="me-2 w-6" src={Logout} /> Logout
              </p>
            </Dropdown>
          </div>
        ) : (
          <div className="flex md:order-2">
            <button
              onClick={() => setLoginModal("initial-focus")}
              className="bg-transparent px-10 py-1 rounded border-2 border-white text-white hover:bg-yellow-400 hover:border-yellow-400 me-4"
            >
              Login
            </button>
            <button
              onClick={() => setRegisterModal("initial-focus")}
              className="bg-yellow-400 px-10 text-white hover:bg-transparent hover:border-white border-2 border-yellow-400 hover:py-0 py-1 rounded "
            >
              Register
            </button>
          </div>
        )}
      </Navbar>
      <LoginModal
        openModal={openModal}
        setRegister={setRegisterModal}
        setOpenModal={setLoginModal}
      />
      <RegisterModal
        show={registerModal}
        setRegister={setRegisterModal}
        setLogin={setLoginModal}
      />
    </div>
  );
};

export const Navbars = () => {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  setAuthToken(localStorage.token);

  let { data: profile } = useQuery("profileImageCache", async () => {
    const response = await API.get(`/myUser`);
    return response.data.data;
  });

  return (
    <div>
      <Navbar fluid className="bg-hero-bg bg-cover relative p-0 sm:px-0">
        <div className="backdrop-blur-sm w-full h-full md:px-24 py-2 flex justify-between">
          {state?.user.role === "admin" ? (
            <Navbar.Brand
              className="cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <img src={Logo} className="w-48" />
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={Logo} className="w-48" />
            </Navbar.Brand>
          )}
          <div className="items-center p-2">
            <Dropdown
              inline
              placement="bottom"
              label={
                <img
                  className="rounded-full w-11 h-11 ring-2 ring-[#FFAF00]"
                  src={profile?.image}
                />
              }
            >
              {state?.user.role === "admin" ? (
                <div>
                  <p
                    onClick={() => navigate("/trip")}
                    className="flex px-6 py-3 text-[14px] hover:bg-slate-200 cursor-pointer my-auto font-semibold"
                  >
                    <img className="me-2 w-6" src={Income} /> Trip
                  </p>
                  <p
                    onClick={() => navigate("/country")}
                    className="flex px-6 py-3 text-[14px] border-b-2 hover:bg-slate-200 cursor-pointer my-auto font-semibold"
                  >
                    <img className="me-2 w-6" src={Pay} /> Country
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    onClick={() => navigate("/profile")}
                    className="flex px-6 py-3 text-[14px] hover:bg-slate-200 cursor-pointer my-auto font-semibold"
                  >
                    <img className="me-2 w-6" src={Profile} /> Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-trip")}
                    className="flex px-6 py-3 text-[14px] border-b-2 hover:bg-slate-200 cursor-pointer my-auto font-semibold"
                  >
                    <img className="me-2 w-6" src={Pay} /> Pay
                  </p>
                </div>
              )}
              <p
                onClick={logout}
                className="flex px-6 py-3 text-[14px] hover:bg-slate-200 cursor-pointer my-auto font-semibold"
              >
                <img className="me-2 w-6" src={Logout} /> Logout
              </p>
            </Dropdown>
          </div>
        </div>
      </Navbar>
    </div>
  );
};
