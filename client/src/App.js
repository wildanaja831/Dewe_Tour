import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import { useContext, useEffect, useState } from "react";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./components/context/UserContext";
import Profile from "./pages/profile";
import MyTrip from "./pages/my-trip";
import DetailTrip from "./pages/detail-trip";
import {
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./components/private-route";
import HomeAdmin from "./pages/admin/home";
import IncomeTrip from "./pages/admin/trip";
import AddNewTrip from "./pages/admin/add-trip";
import Country from "./pages/admin/country";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await API.get("/check/auth");
      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (err) {
      console.log("Check user failed : ", err);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRouteUser />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-trip" element={<MyTrip />} />
            <Route path="/trip/:id" element={<DetailTrip />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/trip" element={<IncomeTrip />} />
            <Route path="/add-trip" element={<AddNewTrip />} />
            <Route path="/country" element={<Country />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
