import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  addWater,
  updateWater,
  waterPerDay,
} from "../../redux/water/operations";
import css from "./WaterForm.module.css";

const schema = yup.object().shape({
  waterVolume: yup
    .number()
    .typeError("Enter a valid amount of water")
    .min(50, "Minimum amount is 50 ml")
    .max(500, "Maximum amount is 500 ml")
    .required("Amount is required"),
  time: yup.string().required("Water consumption time is mandatory"),
});

export default function WaterForm({ closeWaterModal, isAddWater, item }) {
  const dispatch = useDispatch();

  const defaultValues = !isAddWater
    ? {
        date: item.date,
        time: new Date(item.date).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        waterVolume: item.waterVolume,
      }
    : {
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        waterVolume: 50,
      };

  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const date = new Date(data.date);
      const [hours, minutes] = data.time.split(":");
      date.setHours(hours);
      date.setMinutes(minutes);

      const water = {
        amount: data.waterVolume,
        date: date.toISOString(),
      };

      let response;
      if (isAddWater) {
        response = await dispatch(addWater(water));
      } else {
        response = await dispatch(updateWater({ waterId: item._id, ...water }));
      }

      if (response.meta.requestStatus === "fulfilled") {
        const today = new Date().toISOString().split("T")[0];
        await dispatch(waterPerDay(today));
        closeWaterModal();
      } else {
        alert("Failed to add or update water record!");
        closeWaterModal();
      }
    } catch (error) {
      console.error("Error submitting water form:", error);
      alert("An error occurred!");
      closeWaterModal();
    }
  };

  const plusWaterVolume = () => {
    const currentAmount = parseInt(getValues("waterVolume"), 10);
    setValue("waterVolume", currentAmount + 50);
    clearErrors("waterVolume");
  };

  const minusWaterVolume = () => {
    const currentAmount = parseInt(getValues("waterVolume"), 10);
    setValue("waterVolume", Math.max(0, currentAmount - 50));
    clearErrors("waterVolume");
  };

  const handleWaterVolumeChange = (evt) => {
    const value = Number(evt.target.value);
    setValue("waterVolume", value);
    if (value >= 50 && value <= 500) {
      clearErrors("waterVolume");
    }
  };

  return (
    <>
      <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className={css.text}>Amount of water:</p>
          <div className={css.waterCounter}>
            <button
              type="button"
              className={css.waterCountBtn}
              onClick={minusWaterVolume}
            >
              <CiCircleMinus size={42} />
            </button>
            <div className={css.waterAmount}>{`${watch(
              "waterVolume"
            )} ml`}</div>
            <button
              type="button"
              className={css.waterCountBtn}
              onClick={plusWaterVolume}
            >
              <CiCirclePlus size={42} />
            </button>
          </div>
          {errors.waterVolume && (
            <p className={css.error}>{errors.waterVolume.message}</p>
          )}
        </div>

        <p className={css.text}>Recording time</p>
        <input type="time" className={css.timeInput} {...register("time")} />
        {errors.time && <p className={css.error}>{errors.time.message}</p>}

        <p className={css.waterInput}>Enter the value of the water used:</p>
        <input
          type="number"
          step={50}
          min={0}
          className={css.valueInput}
          {...register("waterVolume")}
          onChange={handleWaterVolumeChange}
        />
        {errors.waterVolume && (
          <p className={css.error}>{errors.waterVolume.message}</p>
        )}

        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </form>
    </>
  );
}
