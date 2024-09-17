import css from "./LogOutModal.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/operations";

const LogOutModal = ({ onClose }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post("/users/logout");

      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={css.LogOutModalContainer}>
      <h2 className={css.title}>Log out</h2>
      <p className={css.caption}>Do you really want to leave?</p>
      <div className={css.btnCont}>
        <button className={css.logButton} onClick={handleLogOut}>
          Log out
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default LogOutModal;
