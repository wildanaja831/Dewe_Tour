import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state.user.role === "user") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext);

  if (state.user.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/admin" />;
}
