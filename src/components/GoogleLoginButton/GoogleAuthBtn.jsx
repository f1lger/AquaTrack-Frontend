import { fetchGoogleOAuthUrl } from "../../redux/auth/operations";
import { FcGoogle } from "react-icons/fc";
import styles from "./GoogleAuthBtn.module.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function GoogleAuthBtn({ children }) {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const googleOAuthUrl = await dispatch(fetchGoogleOAuthUrl()).unwrap();
      window.location.href = googleOAuthUrl;
    } catch (error) {
      console.log("Error during google login", error);
    }
  };

  return (
    <>
      <button onClick={handleLogin} className={styles.googleBtn}>
        <FcGoogle className={styles.icon_google} />
        {children}
      </button>
    </>
  );
}

export default GoogleAuthBtn;

GoogleAuthBtn.propTypes = {
  children: PropTypes.string.isRequired,
};
