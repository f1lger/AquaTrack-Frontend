import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "../SharedLayout/SharedLayout";

import { lazy, Suspense, useEffect } from "react";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading, selectAuthToken } from "../../redux/auth/selectors";
import { fetchUser } from "../../redux/auth/operations";
import Loader from "../Loader/Loader.jsx";
import { waterPerDay } from "../../redux/water/operations.js";
import { Toaster } from "react-hot-toast";
// import OAuthCallback from "../GoogleAuthCallback/OAuthCallback.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const ForgotPasswordPage = lazy(() =>
  import("../../pages/ForgotPasswordPage/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() =>
  import("../../pages/ResetPasswordPage/ResetPasswordPage")
);
const TrackerPage = lazy(() =>
  import("../../pages/TrackerPage/TrackerPage.jsx")
);

function App() {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const isRefreshing = useSelector(selectAuthLoading);
  const token = useSelector(selectAuthToken);
  useEffect(() => {
    if (!token) return;
    dispatch(fetchUser());
    dispatch(waterPerDay(today));
  }, [dispatch, token, today]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route path="/confirm-oauth" element={<OAuthCallback />} /> */}
            <Route index element={<HomePage />} />
            <Route
              path="/signup"
              element={<RestrictedRoute component={<SignUpPage />} />}
            />
            <Route
              path="/signin"
              element={<RestrictedRoute component={<SignInPage />} />}
            />
            <Route
              path="/tracker"
              element={<PrivateRoute component={<TrackerPage />} />}
            />
            <Route
              path="/forgot-password"
              element={<RestrictedRoute component={<ForgotPasswordPage />} />}
            />
            <Route
              path="/reset-password"
              element={<RestrictedRoute component={<ResetPasswordPage />} />}
            />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
