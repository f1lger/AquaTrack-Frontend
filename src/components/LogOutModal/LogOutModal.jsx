import css from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={css.LogOutModalContainer}>
      <h2 className={css.title}>{t("logout_modal.log_out")}</h2>
      <p className={css.caption}>{t("logout_modal.confirm_leave")}</p>
      <div className={css.btnCont}>
        <button className={css.logButton} onClick={handleLogOut}>
          {t("logout_modal.log_out")}
        </button>
        <button className={css.cancelButton} onClick={onClose}>
          {t("logout_modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
