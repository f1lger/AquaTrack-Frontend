import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  addWater,
  updateWater,
  waterPerDay,
  waterPerMonth,
} from "../../redux/water/operations";
import css from "./WaterForm.module.css";
import {
  selectCurrentMonth,
  selectedDate,
  selectWaterLoading,
} from "../../redux/water/selectors";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectWaterLoading);
  const [plusError, setPlusError] = useState("");
  const [minusError, setMinusError] = useState("");
  const currentMonth = useSelector(selectCurrentMonth);

  const defaultValues = !isAddWater
    ? {
        date: item.date,
        time: new Date(item.date).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        waterVolume: item.amount,
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
        date: `${date.toISOString().split("T")[0]}T${data.time}`,
      };

      let response;
      if (isAddWater) {
        response = await dispatch(addWater(water));
        dispatch(
          waterPerMonth(
            `${currentMonth.split("-")[0]}-${currentMonth
              .split("-")[1]
              .padStart(2, "0")}`
          )
        );
      } else {
        response = await dispatch(updateWater({ waterId: item._id, ...water }));
      }

      if (response.meta.requestStatus === "fulfilled") {
        const today = new Date().toISOString().split("T")[0];
        await dispatch(waterPerDay(today));
        toast.success(
          `${t("water_record")} ${isAddWater ? t("successfully_added") : t("successfully_updated")}!`
        );
        closeWaterModal();
      } else {
        toast.error(t("failed_to_add_or_update_water_record"));
        closeWaterModal();
      }
    } catch (error) {
      console.error("Error submitting water form:", error);
      toast.error(t("an_error_occurred"));
      closeWaterModal();
    }
  };

  const plusWaterVolume = () => {
    const currentAmount = parseInt(getValues("waterVolume"), 10);
    const newAmount = currentAmount + 50;

    if (newAmount > 500) {
      setPlusError(t("maximum_amount_is_500_ml"));
      return;
    } else {
      setPlusError("");
    }
    setValue("waterVolume", newAmount);
    clearErrors("waterVolume");

    if (newAmount >= 50) {
      setMinusError("");
    }
  };

  const minusWaterVolume = () => {
    const currentAmount = parseInt(getValues("waterVolume"), 10);
    const newAmount = Math.max(0, currentAmount - 50);

    if (newAmount < 50) {
      setMinusError(t("minimum_amount_is_50_ml"));
      return;
    } else {
      setMinusError("");
    }

    setValue("waterVolume", newAmount);
    clearErrors("waterVolume");

    if (newAmount >= 50) {
      setPlusError("");
    }
  };

// const plusWaterVolume = () => {
  //   const currentAmount = parseInt(getValues("waterVolume"), 10);
  //   setValue("waterVolume", currentAmount + 50);
  //   clearErrors("waterVolume");
  // };

  // const minusWaterVolume = () => {
  //   const currentAmount = parseInt(getValues("waterVolume"), 10);
  //   setValue("waterVolume", Math.max(0, currentAmount - 50));
  //   clearErrors("waterVolume");
  // };

  // const handleWaterVolumeChange = (evt) => {
  //   const value = Number(evt.target.value);
  //   setValue("waterVolume", value);
  //   if (value >= 50 && value <= 500) {
  //     clearErrors("waterVolume");
  //   }
  // };


  const handleFocus = (e) => {
    if (isAddWater) {
      if (e.target.value === "50") {
        setValue("waterVolume", "");
      }
    } else if (!isAddWater && item.amount) {
      setValue("waterVolume", "");
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setValue("waterVolume", isAddWater ? 50 : item.amount);
    }
  };

  return (
    <>
      <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className={css.text}>{t("add_water_modal.amount_water")}:</p>
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
          {minusError && <p className={css.error}>{minusError}</p>}
          {plusError && <p className={css.error}>{plusError}</p>}
        </div>

        <p className={css.text}>{t("add_water_modal.recording_time")}</p>
        <input type="time" className={css.timeInput} {...register("time")} />
        {errors.time && <p className={css.error}>{errors.time.message}</p>}

        <p className={css.waterInput}>{t("add_water_modal.enter_water")}:</p>
        <input
          type="number"
          step={1}
          min={0}
          className={css.valueInput}
          {...register("waterVolume")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.waterVolume && (
          <p className={css.error}>{errors.waterVolume.message}</p>
        )}

        <button className={css.saveBtn} type="submit" disabled={isLoading}>
          {isLoading ? t("add_water_modal.saving") : t("add_water_modal.save")}
        </button>
      </form>
    </>
  );
}
