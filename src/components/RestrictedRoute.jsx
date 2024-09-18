import { useSelector } from "react-redux";
import { selectAuthToken } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component: Components }) {
  const token = useSelector(selectAuthToken);

  return token ? <Navigate to="/tracker" /> : Components;
}
