import { Navigate, Outlet } from "react-router-dom";
import { getStorage } from "../shared/utils/storage";
import { ROUTES } from "./appConfig";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = getStorage("token");
  const role = getStorage("userRole");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
