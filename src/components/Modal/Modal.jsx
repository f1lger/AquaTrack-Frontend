import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Modal({ isOpen, onClose, children }) {
  const { t } = useTranslation();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <div className={css.closeIcon} onClick={onClose} aria-label={t('logout_modal.cancel')}>
        <IoCloseSharp size={28} />
      </div>
      {children}
    </ReactModal>
  );
}
