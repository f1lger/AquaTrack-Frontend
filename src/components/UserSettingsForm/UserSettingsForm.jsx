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
import photo from "../../photo/mob/woman-avatar@2x.webp";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/auth/operations";
import { selectAvatar, selectUser, selectUserAvatar } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  avatar: yup.mixed().nullable(),
  gender: yup.string().oneOf(["man", "woman"]).nullable(),
  name: yup
    .string()
    .min(3, "user_valid.name_too_short")
    .max(64, "user_valid.name_too_long")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  email: yup.string().email("auth_valid.invalid_email").nullable(),
  weight: yup
    .number()
    .typeError("user_valid.weight_type_error")
    .positive("user_valid.weight_positive")
    .min(5, "user_valid.weight_min")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  sportTime: yup
    .number()
    .typeError("user_valid.active_time_type_error")
    .positive("user_valid.active_time_positive")
    .min(0, "user_valid.active_time_min")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  dailyWater: yup
    .number()
    .typeError("user_valid.daily_norm_type_error")
    .positive("user_valid.daily_norm_positive")
    .min(1000, "user_valid.daily_norm_min")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? 1000 : value)),
});

const UserSettingsForm = ({ onClose }) => {
  const { t } = useTranslation(); // Initialize localization
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const avatarPhoto = useSelector(selectAvatar);

  const [genderLocal, setGender] = useState(user?.gender || "");
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    avatarPhoto ? avatarPhoto : photo
  );
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

    if (hasChanged("avatar")) {
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
        await dispatch(updateUser(formData)).unwrap();
        toast.success(t("settings.save"));
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(t("something_wrong")); 
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-settings-form">
      <div className="form-group">
        {isAvatarSelected || avatarPreview ? (
          <div className={css.avatarBox}>
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className={css.avatar}
            />
          </div>
        ) : (
          <div className={css.avatarBox}>
            <img src={photo} alt="Avatar Preview" className={css.avatar} />
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
            <p className={css.uploadBoxText}>{t("settings.upload_photo")}</p> 
          </div>
        </label>
        {errors.avatar && (
          <span className="error">{errors.avatar.message}</span>
        )}
      </div>
      <FormControl component="fieldset" className={css.formGroup}>
        <p className={css.titleText}>{t("settings.gender")}</p>
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
            label={<p className={css.radioText}>{t("settings.woman")}</p>}
            className={css.radioLabel}
            checked={genderLocal === "woman"}
          />
          <FormControlLabel
            value="man"
            control={<Radio style={{ color: "#9BE1A0" }} />}
            label={<p className={css.radioText}>{t("settings.man")}</p>}
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
            <label className={css.titleText}>{t("settings.name")}</label>
            <input className={css.input} type="text" {...register("name")} />
            {errors.name && (
              <span className={css.error}>{errors.name.message}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label className={css.titleText}>{t("settings.email")}</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={css.dataBox}>
            <p className={css.titleText}>{t("settings.daily_norm")}</p>
            <div className={css.dataBoxGender}>
              <div className={css.dataBoxGenderText}>
                <p className={css.radioText}>{t("settings.for_woman")}:</p>
                <p className={css.formulaText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className={css.dataBoxGenderText}>
                <p className={css.radioText}>{t("settings.for_man")}:</p>
                <p className={css.formulaText}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
          </div>
          <div className={css.explainBox}>
            <p className={css.explainText}>
              <span className={css.explainAccent}>* </span>{t("settings.notes.description")}
            </p>
          </div>
          <div className={css.warningBox}>
            <svg className={css.banner}>
              <use href={`${sprite}#icon-exclamation`} />
            </svg>
            <p className={css.radioText}>{t("settings.active_time_hours")}</p>
          </div>
        </div>
        <div>
          <div className={css.formGroup}>
            <label className={css.radioText}>{t("settings.weight")}</label>
            <input type="text" {...register("weight")} />
            {errors.weight && (
              <span className={css.error}>{errors.weight.message}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label className={css.radioText}>{t("settings.active_time")}</label>
            <input type="text" {...register("sportTime")} />
            {errors.sportTime && (
              <span className={css.error}>{errors.sportTime.message}</span>
            )}
          </div>
          <div className={css.box}>
            <p className={css.radioText1}>{t("settings.water_norm")}</p>
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
              {t("settings.user_norm")}
            </label>
            <input
              type="text"
              {...register("dailyWater")}
              placeholder="1000 ml"
            />
            {errors.dailyWater && (
              <span className={css.error}>{errors.dailyWater.message}</span>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className={css.saveBtn}>
        {t("settings.save")}
      </button>
    </form>
  );
};

UserSettingsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UserSettingsForm;
