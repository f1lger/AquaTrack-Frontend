import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import styles from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";


const AddWaterBtn = ({ openWaterModal }) => {
  return (
    <>
      <button
        type="button"
        className={styles.addBtn}
        onClick={openWaterModal}
      >
        <FaPlus className={styles.iconPlus} />
        Add water
      </button>
      <WaterModal
        waterModalOpen={showWaterModal}
        closeWaterModal={onCloseWaterModal}
        operationType={operationType}
      />
    </>
  );
};

export default AddWaterBtn;
