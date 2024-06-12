import { TokenUtils } from "@/utils/token-utils";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = TokenUtils.getAccessToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
