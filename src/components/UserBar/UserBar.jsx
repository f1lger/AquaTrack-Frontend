import { useSelector } from "react-redux";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { selectAvatar } from "../../redux/auth/selectors";
import defaultAvatar from "../../photo/mob/default-user-avatar-1x.webp";
import { useRef, useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import LogOutModal from "../LogOutModal/LogOutModal";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function UserBar({ userName }) {
  const { t } = useTranslation();
  const userAvatar = useSelector(selectAvatar);
  const userBarRef = useRef();
  const popoverRef = useRef();

  const [popoverBarModal, setPopoverBarModal] = useState(false);
  const [loguotModal, setLoguotModal] = useState(false);

  const changePopoverBarModal = () => setPopoverBarModal(!popoverBarModal);

  const openLoguotModal = () => setLoguotModal(true);
  const closeLoguotModal = () => setLoguotModal(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        userBarRef.current &&
        !userBarRef.current.contains(event.target)
      ) {
        setPopoverBarModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={userBarRef}
        className={css.UserBar}
        onClick={changePopoverBarModal}
      >
        <p className={css.userName}> {userName ? userName : t("user_greeting")}</p>
        <img
          src={userAvatar ? userAvatar : defaultAvatar}
          alt="avatar"
          loading="lazy"
          className={css.avatar}
        />
        <IoIosArrowDown
          size={16}
          className={clsx(css.icon, popoverBarModal ? css.arrowIconUp : null)}
        />
      </div>

      <UserBarPopover
        openModal={popoverBarModal}
        openLoguotModal={openLoguotModal}
        closeUserBarPopover={() => setPopoverBarModal(false)}
        ref={popoverRef}
      />

      <Modal isOpen={loguotModal} onClose={closeLoguotModal}>
        <LogOutModal onClose={closeLoguotModal} />
      </Modal>
    </div>
  );
}
