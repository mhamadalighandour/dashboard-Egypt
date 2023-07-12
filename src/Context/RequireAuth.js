import { Navigate } from "react-router-dom";
import useFetch from "./useFetch";

const RequireAuth = ({ children }) => {
  const { data } = useFetch(`admin/auth/check`);

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;
};
export const RequireLogin = ({ children }) => {
  const { data } = useFetch(`admin/auth/check`);
  if (
    window.localStorage.getItem("token") &&
    data?.data.data.success === true
  ) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireAuth;
