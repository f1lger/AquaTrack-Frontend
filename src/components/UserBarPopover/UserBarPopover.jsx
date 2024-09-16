import clsx from "clsx";
import { useTranslation } from "react-i18next";

import "../../translate/index.js";
import Icon from "../../shared/components/Icon/Icon.jsx";
import styles from "../UserBarPopover/UserBarPopover.module.css";

export default function UserBarPopover({
  closePopover,
  openSettingModal,
  openLogoutModal,
}) {
  const onLogoutClick = () => {
    openLogoutModal(true);
    closePopover(false);
  };
  const onSettingClick = () => {
    openSettingModal(true);
    closePopover(false);
  };
  const { t, i18n } = useTranslation();

  return (
    <div className={styl.wrap}>
      <button
        className={clsx(css.settingBtn, {
          [styles.settingBtnUk]: i18n.language === "uk",
        })}
        type="button"
        onClick={onSettingClick}
      >
        <Icon
          id="settings"
          width="15"
          height="15"
          className={styles.settingIcon}
        />
        {t("Setting user")}
      </button>
      <button
        className={clsx(css.logoutBtn, {
          [styles.logoutBtnUk]: i18n.language === "uk",
        })}
        type="button"
        onClick={onLogoutClick}
      >
        <Icon
          id="logOut"
          width="15"
          height="15"
          className={styles.logoutIcon}
        />
        {t("Log out")}
      </button>
    </div>
  );
}
