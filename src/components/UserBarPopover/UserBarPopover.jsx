import clsx from "clsx";
import css from "./UserBarPopover.module.css";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
export default function UserBarPopover({
  openModal,
  openLoguotModal,
  openSettingModal,
}) {
  return (
    <div className={clsx(css.UserBarPopover, openModal ? css.open : css.close)}>
      <div className={css.btnList}>
        <button
          type="button"
          onClick={openSettingModal}
          className={css.settingBtn}
        >
          <FiSettings />
          Setting
        </button>
        <button
          type="button"
          onClick={openLoguotModal}
          className={css.logoutBtn}
        >
          <FiLogOut/>
          Log out
        </button>
      </div>
    </div>
  );
}
