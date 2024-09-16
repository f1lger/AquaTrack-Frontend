import { useSelector } from "react-redux";
import { selectIsLoggerIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ component: Components }) {
  const islogedIn = useSelector(selectIsLoggerIn);

  return islogedIn ? Components : <Navigate to="/"/>;
}
