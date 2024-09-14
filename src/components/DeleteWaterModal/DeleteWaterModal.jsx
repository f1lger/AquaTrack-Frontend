// import Modal from "../Modal/Modal";
import css from "./DeleteWaterModal.module.css";


const DeleteWaterModal = () => {

  const buttonColorClass = `${css.btn} ${css.btnColor}`;


const buttonGreyClass = `${css.btn} ${css.btnTransparent}`;

  return (
    <>
      <div className={css.modal}>
        <h3 className={css.modalHead}>Delete entry</h3>
        <p className={css.modalText}>Are you sure you want to delete the entry?</p>
        <div className={css.logOutButtons}>
          <button className={buttonColorClass} >
          Delete
          </button>
          <button className={buttonGreyClass} >
          Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteWaterModal;