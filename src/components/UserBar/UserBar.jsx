import { IoIosArrowDown } from "react-icons/io";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { selectUser } from "../../redux/user/selectors";
import { RxAvatar } from "react-icons/rx";

// import UserSettingsModal from "";
// import LogOutModal from "";

import styles from "../UserBar/UserBar.module.css";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import Modal from "../Modal/Modal";

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const user = useSelector(selectUser);

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={["bottom"]}
        onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
        content={
          <UserBarPopover
            closePopover={setIsPopoverOpen}
            openLogoutModal={setIsLogOutModalOpen}
            openSettingModal={setIsSettingsModalOpen}
          />
        }
        containerClassName={styles.popover}
      >
        <button
          type="button"
          className={styles.btn}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <p className={styles.name}>{user.name ? user.name : "User"}</p>
          {user.avatarURL ? (
            <img className={styles.img} src={user.avatarURL} alt="avatar" />
          ) : (
            <RxAvatar className={styles.iconAvatar} />
          )}

          <IoIosArrowDown
            className={clsx(css.icon, isPopoverOpen && css.iconUp)}
          />
        </button>
      </Popover>
      {isSettingsModalOpen && (
        <Modal
          btnClassName={styles.settingsClose}
          isOpen={isSettingsModalOpen}
          onClose={() => {
            setIsSettingsModalOpen(false);
          }}
          isModal={isSettingsModalOpen}
        >
          <UserSettingsModal isModalOpen={setIsSettingsModalOpen} />
        </Modal>
      )}
      {isLogOutModalOpen && (
        <Modal
          isOpen={isLogOutModalOpen}
          onClose={() => {
            setIsLogOutModalOpen(false);
          }}
          isModal={isLogOutModalOpen}
        >
          <LogOutModal isModalOpen={setIsLogOutModalOpen} />
        </Modal>
      )}
    </>
  );
}
