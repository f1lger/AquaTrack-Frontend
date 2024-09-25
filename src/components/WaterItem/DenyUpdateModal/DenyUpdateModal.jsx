import css from "./DenyUpdateModal.module.css";

const DenyUpdateModal = ({ onClose }) => {
  const buttonClose = `${css.btn} ${css.btnClose}`;

  return (
    <div className={css.modal}>
      <h3 className={css.modalHead}>Sorry,</h3>
      <p className={css.modalText}>we can not update entries in the past!</p>
      <div className={css.closeBtn}>
        <button className={buttonClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DenyUpdateModal;
