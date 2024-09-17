import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import TrackerPage from "../../pages/TrackerPage/TrackerPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

function App() {
  return (
    <>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/settings" element={<UserSettingsForm/>} />
        </Routes>
      </SharedLayout>
    </>
  );
}

export default App;
