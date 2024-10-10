import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations.js";
import { useState } from "react";
import iconSprite from "../../icons/symbol-defs.svg";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { selectAuthError } from "../../redux/auth/selectors.js";
import { useTranslation } from "react-i18next";

const signInFormSchema = Yup.object({
  email: Yup.string()
    .email("auth_valid.invalid_email") 
    .required("auth_valid.required_email"),
  password: Yup.string()
    .min(6, "auth_valid.password_min")
    .max(64, "auth_valid.password_max")
    .required("auth_valid.password_required"),
});

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reduxError = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const loginResult = await dispatch(login({ email, password }));
      if (login.fulfilled.match(loginResult)) {
        navigate("/tracker");
        reset();
      } else {
        toast.error(t("login_failed"));
      }
    } catch (error) {
      toast.error(t("login_error") + ": " + (error.message || t("generic_error")));
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signInContainer}>
      <h2 className={css.title}>{t('sign_in.title')}</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>{t('sign_in.email')}: </span>
          <input
            type="email"
            {...register("email")}
            placeholder={errors.email ? t(errors.email.message) : t("sign_in.email_placeholder")}
            className={clsx(css.input, { [css.inputError]: errors.email })}
          />
          <p className={css.errorMessage}>{errors.email?.message && t(errors.email.message)}</p>
        </label>
        <label className={css.field}>
          <span className={css.label}>{t('sign_in.password')}: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder={errors.password ? t(errors.password.message) : t("sign_in.password_placeholder")}
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
          <p className={css.errorMessage}>{errors.password?.message && t(errors.password.message)}</p>
        </label>

        {reduxError ? (
          <div className={css.errorMessage}>
            {t("login_failed")}
          </div>
        ) : (
          ""
        )}

        <button type="submit" className={css.submit} disabled={loading}>
          {loading ? t("sign_in.login_success") : t("sign_up.sign_in")}
        </button>

      </form>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>
          {t("sign_up.already_have_account")}{" "}
          <NavLink to="/signup" className={css.signUpLink}>
            {t("sign_up.sign_up")}
          </NavLink>
        </p>
      </div>
      <div className={css.forgotPasswordContainer}>
        <p className={css.questionText}>{t("forgot_password.title")}</p>
        <NavLink to="/forgot-password" className={css.forgotPasswordLink}>
          {t("forgot_password.send_email")}
        </NavLink>
      </div>
    </div>
  );
};

export default SignInForm;
