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

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPasswordForm = () => {
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
      dispatch(resetPassword({ token, password: data.password }));
      toast.success("Password reset successful!");
      navigate("/signin");
    } catch (error) {
      toast.error("Failed to reset password: " + error.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Reset Password</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>New Password: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className={clsx(css.input, { [css.inputError]: errors.password })}
            />
            <button
              className={css.showPasswordBtn}
              type="button"
              onClick={handleClickShowPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          <p className={css.errorMessage}>{errors.password?.message}</p>
        </label>

        <label className={css.field}>
          <span className={css.label}>Confirm Password: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm new password"
              className={clsx(css.input, {
                [css.inputError]: errors.confirmPassword,
              })}
            />
            <button
              className={css.showPasswordBtn}
              type="button"
              onClick={handleClickShowPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          <p className={css.errorMessage}>{errors.confirmPassword?.message}</p>
        </label>
        <button type="submit" className={css.submitbtn}>
          Reset Password
        </button>
      </form>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>
          Don`t have an account?{" "}
          <NavLink to="/signup" className={css.signUpLink}>
            Sign Up
          </NavLink>
        </p>
      </div>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>Already have an account?</p>
        <NavLink to="/signin" className={css.signUpLink}>
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
