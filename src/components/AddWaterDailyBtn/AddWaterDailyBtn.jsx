// import Loader from "../../Loader/Loader";
import css from "./AddWaterDailyBtn.module.css";

const AddWaterDailyBtn = ({ openWaterModal }) => {
  return (
    <>
      <div className={css.wrapper}>
        <button type="button" className={css.plusBtn} onClick={openWaterModal}>
          +
        </button>
        <p className={css.text}>Add water</p>
      </div>
    </>
  );
};

export default AddWaterDailyBtn;
