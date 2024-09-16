import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import styles from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";

const AddWaterBtn = () => {
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState('add');

  const onOpenWaterModal = (type) => {
    setOperationType(type);
    setShowWaterModal(true);
  };

  const onCloseWaterModal = () => {
    setShowWaterModal(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.addBtn} 
        onClick={() => onOpenWaterModal('add')}
      >
        <FaPlus className={styles.iconPlus} />
        Add water
      </button>
      <WaterModal
        waterModalOpen={showWaterModal}
        closeWaterModal={onCloseWaterModal}
        isAddWater={operationType}       
      />
    </>
  );
};

export default AddWaterBtn;
