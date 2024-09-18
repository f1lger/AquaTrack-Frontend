import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "../SharedLayout/SharedLayout";
<<<<<<< SignInPage

import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage'

=======
import { lazy, Suspense } from "react";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
>>>>>>> main
function App() {
  return (
    <>
      <SharedLayout>
<<<<<<< SignInPage
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Routes>
=======
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
          </Routes>
        </Suspense>
>>>>>>> main
      </SharedLayout>
    </>
  );
}

export default App;
