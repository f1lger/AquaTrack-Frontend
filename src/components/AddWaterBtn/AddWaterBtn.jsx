// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import WaterModal from "../WaterModal/WaterModal";
import styles from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";

const AddWaterBtn = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useDispatch();

  return (
    <>
      <button
        type="button"
        className={styles.addBtn}
        // onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className={styles.iconPlus} />
        Add water
      </button>
      {/* {isModalOpen && (
        <WaterModal onClose={() => setIsModalOpen(false)}/>
      )} */}
    </>
  );
};

export default AddWaterBtn;
