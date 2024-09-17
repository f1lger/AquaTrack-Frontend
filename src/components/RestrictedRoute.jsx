import { useSelector } from "react-redux";
import { selectIsLoggerIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component: Components }) {
  const islogedIn = useSelector(selectIsLoggerIn);

  return islogedIn ? <Navigate to="/tracker" /> : Components;
}
