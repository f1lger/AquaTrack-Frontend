import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "../SharedLayout/SharedLayout";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../../redux/auth/selectors";
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
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </>
  );
}

export default App;
