import { useState } from "react";
import css from "./GoogleLoginButton.module.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Button = ({ children, type = "button", onClick, ...props }) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// eslint-disable-next-line react/prop-types
const GoogleLoginButton = ({ context }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get("/auth/google/get-oauth-url");
    const { url } = response.data.data;
    window.location.href = url;
  } catch (error) {
    console.error("Problem getting URL for Google OAuth:", error);
    setError("Failed to get authorization URL.  Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Button className={css.google_btn} onClick={handleGoogleLogin} disabled={loading}>
        {loading ? (
          <span>Завантаження...</span>
        ) : (
          <>
            <FcGoogle className={css.icon_google} />
            {context}
          </>
        )}
      </Button>
      {error && <div className={css.error}>{error}</div>}
    </div>
  );
};

export default GoogleLoginButton;
