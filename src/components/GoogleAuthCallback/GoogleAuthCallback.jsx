import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logInWithGoogle } from "../../redux/user/operations.js";
import { useDispatch } from "react-redux";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      if (code) {
        try {
          await dispatch(logInWithGoogle(code));
          navigate("/tracker");
        } catch (error) {
          console.error("Login error:", error);
          setError("Login failed. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No code provided.");
        setLoading(false);
      }
    };

    handleGoogleLogin();
  }, [location, navigate, dispatch]);

  if (loading) return <div>Logging in with Google...</div>;
  if (error) return <div>{error}</div>;

  return null;
};

export default GoogleAuthCallback;
