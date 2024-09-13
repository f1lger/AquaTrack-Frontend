import styles from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";

const AddWaterBtn = () => {
  return (
    <>
      <button type="button" className={styles.addBtn}>
        <FaPlus className={styles.iconPlus} />
        Add water
      </button>
    </>
  );
};

export default AddWaterBtn;
