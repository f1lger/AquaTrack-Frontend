import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      ariaHideApp={false}
      overlayClassName={css.overlay}
      onClick={handleOverlayClick}
    >
      <div className={css.closeIcon} onClick={onClose}>
        <IoCloseSharp size={28} />
      </div>
      {children}
    </ReactModal>
  );
}
