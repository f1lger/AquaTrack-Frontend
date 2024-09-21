import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "../SharedLayout/SharedLayout";

import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";

import { lazy, Suspense } from "react";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
function App() {
  return (
    <>
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            <Route path="/" element={<SharedLayout/>}>
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
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>
          </Routes>
        </Suspense>
    </>
  );
}

export default App;
