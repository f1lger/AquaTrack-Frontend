import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import css from "./ForgotPasswordForm.module.css";
import clsx from "clsx";
import { sendPasswordResetEmail } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("auth_valid.invalid_email")
    .required("auth_valid.required_email"),
});

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(sendPasswordResetEmail(data.email)).unwrap();
      toast.success(t("forgot_password.success_message"));
    } catch (error) {
      toast.error(t("forgot_password.error_message") + ": " + error.message);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t("forgot_password.title")}</h2>
      <p>{t("forgot_password.instruction")}</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>{t("sign_in.email")}: </span>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder={t("sign_in.email_placeholder")}
            className={clsx(css.input, { [css.inputError]: errors.email })}
          />
          <p className={css.errorMessage}>{t(errors.email?.message)}</p>
        </label>
        <button type="submit" className={css.submitbtn}>
          {t("forgot_password.send_email")}
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

ForgotPasswordForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default ForgotPasswordForm;
