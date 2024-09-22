import css from "./AddDailyWaterBtn.module.css";

const AddDailyWaterBtn = ({ openWaterModal }) => {
  return (
    <div className={css.wrapper}>
      <button type="button" className={css.plusBtn} onClick={openWaterModal}>
        +
      </button>
      <p className={css.text}>Add water</p>
    </div>
  );
};

export default AddDailyWaterBtn;
