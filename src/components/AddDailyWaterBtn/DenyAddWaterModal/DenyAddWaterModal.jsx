import css from "./DenyAddWaterModal.module.css";

const DenyAddWaterModal = ({ onClose }) => {
  const buttonClose = `${css.btn} ${css.btnClose}`;

  return (
    <div className={css.modal}>
      <h3 className={css.modalHead}>Sorry,</h3>
      <p className={css.modalText}>
        we can not add water in the past or in the future!
      </p>
      <div className={css.closeBtn}>
        <button className={buttonClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DenyAddWaterModal;
