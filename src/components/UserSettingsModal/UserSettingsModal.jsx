import { useCallback, useEffect } from "react";
import Modal from "react-modal";
import css from "./UserSettingsModal.module.css";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(47, 47, 47, 0.6)",
  },
};

Modal.setAppElement("#root");

export const UserSettingsModal = ({ isOpen, onRequestClose, children, title }) => {
  const { t } = useTranslation(); 

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className={title === t("settings.header") ? css.content : css.logoutContent}
      style={customStyles}
      id="userSettingsModal"
    >
      <div className={css.modalHeader}>
        {title === t("settings.header") && ( 
          <div className={css.textBox}>
            <p className={css.titleHeader}>{t("settings.header")}</p>
          </div>
        )}

        <div className={css.closeBtn}>
          <MdClose onClick={onRequestClose} size={"24px"} />
        </div>
      </div>
      {(title === t("logout_modal.log_out") || title === "Delete") && (
        <div className={css.textBox}>
          <p className={css.titleHeader}>{t(title)}</p>
        </div>
      )}
      <div className={css.modalContent}>{children}</div>
    </Modal>
  );
};

UserSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
