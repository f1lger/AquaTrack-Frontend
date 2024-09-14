import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import * as yup from "yup";
import css from "./WaterForm.module.css";

const schema = yup.object().shape({
  volumeOfWater: yup
    .number()
    .typeError("Enter a valid amount of water")
    .min(50, "Minimum amount is 50 ml")
    .max(500, "Maximum amount is 500 ml")
    .required("Amount is required"),
  time: yup.string().required("Time is required"),
});

const WaterForm = () => {
  return (
    <>
      <form className={css.waterForm}>
        <div>
          <p className={css.text}>Amount of water:</p>
          <div className={css.waterCounter}>
            <button type="button" className={css.waterCountBtn}>
              <CiCircleMinus size={42} />
            </button>
            <div className={css.waterAmount}>ml</div>
            <button type="button" className={css.waterCountBtn}>
              <CiCirclePlus size={42} />
            </button>
          </div>
        </div>
        <p className={css.text}>Recording time</p>
        <input type="time" name="time" className={css.timeInput} />

        <p className={css.waterInput}>Enter the value of the water used:</p>
        <input type="number" name="waterVolume" className={css.valueInput} />

        <button className={css.saveBtn} type="submit">
        Save
        </button>
      </form>
    </>
  );
};

export default WaterForm;
