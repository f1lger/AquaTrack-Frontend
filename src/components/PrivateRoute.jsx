import { useSelector } from "react-redux";
import { selectAuthToken } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ component: Components }) {
  const token = useSelector(selectAuthToken);

  return token ? Components : <Navigate to="/signin" />;
}
