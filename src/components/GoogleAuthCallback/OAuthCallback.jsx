import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmOAuth } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

function OAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOAuth = async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      if (code) {
        try {
          const resultAction = await dispatch(confirmOAuth(code));
          if (confirmOAuth.fulfilled.match(resultAction)) {
            console.log('login +', resultAction);
            
            navigate("/tracker");
          } else {
            toast.error("Error during OAuth. Please try again.");
          }
        } catch (error) {
          toast.error(`Error during login: ${error.message}`);
        }
      } else {
        toast.error("Authorization code not found.");
      }
    };

    handleOAuth();
  }, [navigate, dispatch]);

  return (
    <div>
      <p>Processing your login...</p>
    </div>
  );
}

export default OAuthCallback;