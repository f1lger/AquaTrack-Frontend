import Modal from "../Modal/Modal";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({
  waterModalOpen,
  closeWaterModal,
  operationType,
  item,
}) => {
  const title =
    operationType === "add" ? "Add water" : "Edit the entered amount of water";
  const value =
    operationType === "add" ? "Choose a value:" : "Correct entered data:";

  return (
    <Modal modalIsOpen={waterModalOpen} closeModal={closeWaterModal}>
      <div className={css.waterModal}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalValue}>{value}</p>
        <WaterForm
          operationType={operationType}
          closeWaterModal={closeWaterModal}
          item={item}
        />
      </div>
    </Modal>
  );
};

export default WaterModal;
