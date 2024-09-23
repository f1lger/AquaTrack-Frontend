import clsx from "clsx";
import css from "./UserBarPopover.module.css";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useState, forwardRef } from "react";
import Modal from "../Modal/Modal";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";

const UserBarPopover = forwardRef(
  ({ openModal, openLoguotModal, closeUserBarPopover }, ref) => {
    const [settingModal, setSettingModal] = useState(false);

    const openSettingModal = () => setSettingModal(true);
    const closeSettingModal = () => setSettingModal(false);

    return (
      <div
        ref={ref}
        className={clsx(css.UserBarPopover, openModal ? css.open : css.close)}
      >
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
            <FiLogOut />
            Log out
          </button>
        </div>
        <Modal isOpen={settingModal} onClose={closeSettingModal}>
          <UserSettingsForm onClose={closeSettingModal} />
        </Modal>
      </div>
    );
  }
);

UserBarPopover.displayName = "UserBarPopover";

export default UserBarPopover;
