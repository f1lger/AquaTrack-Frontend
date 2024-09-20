import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "../SharedLayout/SharedLayout";
import { lazy, Suspense } from "react";
import RestrictedRoute from "../RestrictedRoute";
import PrivateRoute from "../PrivateRoute";
import { Toaster } from "react-hot-toast";
import WaterItem from "../WaterItem/WaterItem";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
function App() {
  return (
    <>
      <SharedLayout>
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
        <WaterItem/>
      </SharedLayout>
      <Toaster />
    </>
  );
}

export default App;
