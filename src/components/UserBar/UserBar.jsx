import { useSelector } from "react-redux";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { selectAvatar } from "../../redux/auth/selectors";
import defaultAvatar from "../../photo/mob/default-user-avatar-1x.webp";
import { useRef, useState } from "react";
import Modal from "../Modal/Modal";
import LogOutModal from "../LogOutModal/LogOutModal";
import clsx from "clsx";
export default function UserBar({ userName }) {
  const userAvatar = useSelector(selectAvatar);
  const userBar = useRef();
  const [popoverBarModal, setPopoverBarModal] = useState(false);
  const changePopoverBarModal = () =>
    setPopoverBarModal(popoverBarModal ? false : true);
  const [loguotModal, setLoguotModal] = useState(false);

  const openLoguotModal = () => setLoguotModal(true);
  const closeLoguotModal = () => setLoguotModal(false);
  return (
    <div>
      <div
        ref={userBar}
        className={css.UserBar}
        onClick={() => changePopoverBarModal()}
      >
        {userName ? userName : "user"}
        <img
          src={userAvatar ? userAvatar : defaultAvatar}
          alt="avatar"
          loading="lazy"
        />
        <IoIosArrowDown
          size={16}
          className={clsx(
            css.icon,
            popoverBarModal ? css.arrowIconUp : null
          )}
        />
      </div>
      <UserBarPopover
        openModal={popoverBarModal}
        openLoguotModal={openLoguotModal}
      />
      <Modal isOpen={loguotModal} onClose={closeLoguotModal}>
        <LogOutModal onClose={closeLoguotModal} />
      </Modal>
    </div>
  );
}
