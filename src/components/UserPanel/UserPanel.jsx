import { selectUser } from "../../redux/user/selectors";
// import { login } from "../../redux/user/operations.js";
import styles from "../UserPanel/UserPanel.module.css";
import UserBar from "../../components/UserBar/UserBar";

import { useTranslation } from "react-i18next";
import "../../translate/index.js";

export const UserPanel = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  return (
    <div className={css.wrap}>
      <p className={css.title}>
        {t("Hello user")},{" "}
        <span className={styles.name}>{user.name ? user.name : "User"}!</span>
      </p>
      <UserBar />
    </div>
  );
};
