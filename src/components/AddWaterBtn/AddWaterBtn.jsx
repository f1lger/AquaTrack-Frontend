import styles from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  return (
    <>
      <button type="button" className={styles.addBtn}>
        <svg className={styles.iconPlus} width="16" height="16">
          <use href="../../icons/symbol-defs.svg#icon-plus"></use>
        </svg>
        Add water
      </button>
    </>
  );
};

export default AddWaterBtn;
