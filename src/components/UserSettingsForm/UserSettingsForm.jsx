import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineFileUpload } from "react-icons/md";
import css from "./UserSettingsForm.module.css";
//  import svg from "../../assets/react.svg";
import sprite from "../../icons/symbol-defs.svg";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// import { ModalBtn } from "../ModalBtn/Modalbtn";
import photo from "../../photo/mob/woman-avatar@2x.webp";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/auth/operations";
import { selectUser, selectUserAvatar } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  avatar: yup.mixed().nullable(),
  gender: yup.string().oneOf(["man", "woman"]).nullable(),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(13, "Name must be no more than 13 characters")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)), // Перетворення порожнього рядка
  email: yup.string().email("Invalid email format").nullable(),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number")
    .min(5, "Weight must be at least 5 kg")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  sportTime: yup
    .number()
    .typeError("Active minutes must be a number")
    .positive("Active minutes must be a positive number")
    .min(0, "Sport time must be at least 0 minutes")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  dailyWater: yup
    .number()
    .typeError("Water consumption must be a number")
    .positive("Water consumption must be a positive number")
    .min(1800, "Water consumption must be at least 1800 ml")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? 1800 : value)),
});

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const avatarPhoto = useSelector(selectUserAvatar);

  const [genderLocal, setGender] = useState(user?.gender || "");
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    avatarPhoto ? avatarPhoto : photo
  );
  console.log(user);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      weight: user?.weight || "",
      sportTime: user?.sportTime || "",
      dailyWater: user?.dailyNorma || "",
    },
  });

  useEffect(() => {
    reset({
      avatar: user?.avatar || "",
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      weight: user?.weight || "",
      sportTime: user?.sportTime || "",
      dailyWater: user?.dailyNorma || "",
    });
  }, [user, reset]);

  const watchWeight = watch("weight", 0);
  const watchActiveMinutes = watch("sportTime", 0);

  const calculateRecommendedWaterIntake = (weight, sportTime) => {
    return genderLocal === "man"
      ? (weight * 0.04 + sportTime * 0.6).toFixed(1)
      : (weight * 0.03 + sportTime * 0.4).toFixed(1);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    const hasChanged = (fieldName) => {
      if (typeof data[fieldName] === "number") {
        data[fieldName] = data[fieldName].toString();
      }
      return data[fieldName] !== user[fieldName];
    };

    if (isAvatarSelected) {
      formData.append("avatar", data.avatar || photo);
    }
    if (hasChanged("gender")) {
      formData.append("gender", data.gender);
    }
    if (hasChanged("name")) {
      formData.append("name", data.name);
    }
    if (hasChanged("email")) {
      formData.append("email", data.email);
    }
    if (hasChanged("weight")) {
      formData.append("weight", data.weight || 0);
    }
    if (hasChanged("dailyWater")) {
      formData.append("dailyWater", data.dailyWater || 0);
    }
    if (hasChanged("sportTime")) {
      formData.append("sportTime", data.sportTime || 0);
    }

    if (
      isAvatarSelected ||
      hasChanged("gender") ||
      hasChanged("name") ||
      hasChanged("email") ||
      hasChanged("weight") ||
      hasChanged("dailyWater") ||
      hasChanged("sportTime")
    ) {
      try {
        dispatch(updateUser(formData));
        toast.success("The settings have been updated successfully!");
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-settings-form">
      <div className="form-group">
        {user.avatar && (
          <div className={css.avatarBox}>
            <img
              src={user.avatar}
              alt="Avatar Preview"
              className={css.avatar}
            />
          </div>
        )}
        <input
          type="file"
          id="avatar"
          {...register("avatar")}
          onChange={(e) => {
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
            setValue("avatar", e.target.files[0], {
              shouldValidate: true,
            });
            setIsAvatarSelected(true);
          }}
        />
        <label htmlFor="avatar" className={css.fileLabel}>
          <div className={css.uploadBox}>
            <MdOutlineFileUpload className="upload-icon" />
            <p className={css.uploadBoxText}> Upload a photo</p>
          </div>
        </label>
        {errors.avatar && (
          <span className="error">{errors.avatar.message}</span>
        )}
      </div>
      <FormControl component="fieldset" className={css.formGroup}>
        <p className={css.titleText}> Your gender identity</p>
        <RadioGroup
          row
          value={genderLocal}
          onChange={(e) => {
            setGender(e.target.value);
            setValue("gender", e.target.value);
          }}
          className={css.radioGroup}
        >
          <FormControlLabel
            value="woman"
            control={<Radio style={{ color: "#9BE1A0" }} />}
            label={<p className={css.radioText}>Woman</p>}
            className={css.radioLabel}
            checked={genderLocal === "woman"}
          />
          <FormControlLabel
            value="man"
            control={<Radio style={{ color: "#9BE1A0" }} />}
            label={<p className={css.radioText}>Man</p>}
            className={css.radioLabel}
            checked={genderLocal === "man"}
          />
        </RadioGroup>
        {errors.gender && (
          <span className={css.error}>{errors.gender.message}</span>
        )}
      </FormControl>
      <div className={css.contentBox}>
        <div className={css.smallBox}>
          <div className={css.formGroup}>
            <label className={css.titleText}>Your name</label>
            <input className={css.input} type="text" {...register("name")} />
            {errors.name && (
              <span className={css.error}>{errors.name.message}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label className={css.titleText}>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={css.dataBox}>
            <p className={css.titleText}>My daily norma</p>
            <div className={css.dataBoxGender}>
              <div className={css.dataBoxGenderText}>
                <p className={css.radioText}>For woman:</p>
                <p className={css.formulaText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className={css.dataBoxGenderText}>
                <p className={css.radioText}>For man:</p>
                <p className={css.formulaText}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
          </div>
          <div className={css.explainBox}>
            <p className={css.explainText}>
              <span className={css.explainAccent}>* </span>V is the volume of
              the water norm in liters per day, M is your body weight, T is the
              time of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
          <div className={css.warningBox}>
            {/* <img src={svg} alt="banner" className={css.banner} /> */}

            <svg className={css.banner}>
              <use href={`${sprite}#icon-exclamation`} />
            </svg>

            <p className={css.radioText}>Active time in hours</p>
          </div>
        </div>
        <div>
          <div className={css.formGroup}>
            <label className={css.radioText}>Your weight in kilograms:</label>
            <input type="text" {...register("weight")} />
            {errors.weight && (
              <span className={css.error}>{errors.weight.message}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label className={css.radioText}>
              The time of active participation in sports:
            </label>
            <input type="text" {...register("sportTime")} />
            {errors.sportTime && (
              <span className={css.error}>{errors.sportTime.message}</span>
            )}
          </div>
          <div className={css.box}>
            <p className={css.radioText1}>
              The required amount of water in liters per day:
            </p>
            <p className={css.recWater}>
              {genderLocal && watchWeight
                ? calculateRecommendedWaterIntake(
                    watchWeight,
                    watchActiveMinutes,
                    genderLocal
                  )
                : 1.8}
              L
            </p>
          </div>
          <div className={css.formGroup}>
            <label id="dailyWater" className={css.titleText}>
              Write down how much water you will drink:
            </label>
            <input
              type="text"
              {...register("dailyWater")}
              placeholder="1800 ml"
            />
            {errors.dailyWater && (
              <span className={css.error}>{errors.dailyWater.message}</span>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className={css.saveBtn}>
        Save
      </button>
      {/* <ModalBtn text={"Save"} onClick={handleSubmit(onSubmit)} /> */}
    </form>
  );
};

UserSettingsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UserSettingsForm;
