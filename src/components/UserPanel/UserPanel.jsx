import { useSelector } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";
import { useTranslation } from "react-i18next";

export default function UserPanel() {
  const { t } = useTranslation();
  const userName = useSelector(selectName);
  
  return (
    <div className={css.userPanelCont}>
      <p className={css.welcomeTitle}>
        {t("user_greeting")}, <span>{userName ? userName : t("user")}</span>
      </p>
      <UserBar userName={userName} />
    </div>
  );
}
