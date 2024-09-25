import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./components/App/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/* <GoogleOAuthProvider clientId='462820029630-4g17hn1moappabshpf7cfva49ehmg5rh.apps.googleusercontent.com'> */}
            <App />
          {/* </GoogleOAuthProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
