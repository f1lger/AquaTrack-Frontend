
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/operations";
import css from "./DeleteWaterModal.module.css";
import toast from "react-hot-toast";

const DeleteWaterModal = ({ modalIsOpen, closeModal, waterId }) => {
  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(deleteWater(waterId))
      .unwrap()
      .then(() => {
        toast.success("The water record was successfully deleted!");
        closeModal(); 
      })
      .catch((error) => {
        toast.error("Failed to delete the water record. Please try again.");
      });
  };


  const handleCancel = () => {
    closeModal();
  };

  const buttonColorClass = `${css.btn} ${css.btnColor}`;
  const buttonCancelClass = `${css.btn} ${css.btnCancel}`;

  return (
    <>
      <div className={css.modal}>
        <h3 className={css.modalHead}>Delete entry</h3>
        <p className={css.modalText}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.logOutButtons}>
          <button className={buttonColorClass} onClick={handleDelete}>
            Delete
          </button>
          <button className={buttonCancelClass} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteWaterModal;
