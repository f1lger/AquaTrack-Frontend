import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./ResetPasswordForm.module.css";
import clsx from "clsx";
import { resetPassword } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import iconSprite from "../../icons/symbol-defs.svg";
import { useTranslation } from "react-i18next";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "auth_valid.password_min")
    .required("auth_valid.password_required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "sign_up.passwords_must_match") 
    .required("sign_up.confirm_password_required"),
});

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(resetPassword({ token, password: data.password })).unwrap();
      toast.success(t("reset_pwd.password_reset_successful"));
      navigate("/signin");
    } catch (error) {
      toast.error(t("reset_pwd.password_reset_failed") + ": " + error.message); 
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t("reset_pwd.change_password")}</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>{t("reset_pwd.password")}: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder={t("enter_password")}
              className={clsx(css.input, { [css.inputError]: errors.password })}
            />
            <button
              className={css.showPasswordBtn}
              type="button"
              onClick={handleClickShowPassword}
              aria-label={showPassword ? t("sign_up.hide_password") : t("sign_up.show_password")}
            >
              {showPassword ? (
                <svg className={css.icon}>
                  <use href={`${iconSprite}#icon-eye`}></use>
                </svg>
              ) : (
                <svg className={css.icon}>
                  <use href={`${iconSprite}#icon-eye-off`}></use>
                </svg>
              )}
            </button>
          </div>
          <p className={css.errorMessage}>{t(errors.password?.message)}</p>
        </label>

        <label className={css.field}>
          <span className={css.label}>{t("reset_pwd.confirm_password")}: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              placeholder={t("reset_pwd.enter_new_password")}
              className={clsx(css.input, {
                [css.inputError]: errors.confirmPassword,
              })}
            />
            <button
              className={css.showPasswordBtn}
              type="button"
              onClick={handleClickShowPassword}
              aria-label={showPassword ? t("sign_up.hide_password") : t("sign_up.show_password")}
            >
              {showPassword ? (
                <svg className={css.icon}>
                  <use href={`${iconSprite}#icon-eye`}></use>
                </svg>
              ) : (
                <svg className={css.icon}>
                  <use href={`${iconSprite}#icon-eye-off`}></use>
                </svg>
              )}
            </button>
          </div>
          <p className={css.errorMessage}>{t(errors.confirmPassword?.message)}</p>
        </label>
        <button type="submit" className={css.submitbtn}>
          {t("reset_pwd.change_password")}
        </button>
      </form>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>
          {t("sign_in.invite_text")}{" "}
          <NavLink to="/signup" className={css.signUpLink}>
            {t("sign_up.sign_up")}
          </NavLink>
        </p>
      </div>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>{t("sign_up.already_have_account")}</p>
        <NavLink to="/signin" className={css.signUpLink}>
          {t("sign_up.sign_in")}
        </NavLink>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
