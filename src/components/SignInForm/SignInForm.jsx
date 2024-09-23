import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/operations.js";
import { useState } from "react";
import iconSprite from "../../icons/symbol-defs.svg";
import { toast } from "react-toastify";
import * as Yup from "yup";

/*
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton.jsx';
*/

const signInFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Must contain at least 3 characters")
    .max(64, "Password can't be longer than 64 characters")
    .required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();

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
      const response = await dispatch(login({ email, password }));

      if (response.error) {
        throw new Error(response.error.message || "Unknown error");
      }
      toast.success("Successfully logged in!");
      navigate("/tracker");
      reset();
    } catch (error) {
      toast.error("Failed to login " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signInContainer}>
      <h2 className={css.title}>Sign In</h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>Email: </span>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            placeholder="Enter your email"
            className={clsx(css.input, { [css.inputError]: errors.email })}
          />
          <p className={css.errorMessage}>{errors.email?.message}</p>
        </label>
        <label className={css.field}>
          <span className={css.label}>Password: </span>
          <div className={css.inputField}>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className={clsx(css.input, {
                [css.inputError]: errors.password,
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
          <p className={css.errorMessage}>{errors.password?.message}</p>
        </label>

        <button type="submit" className={css.submit} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {/* 
<p className={css.questionText}>or</p>
        <GoogleLoginButton
          context={"Sign In with Google"}
          onClick={() => {

          }}
        />
*/}
      </form>
      <div className={css.questionOnLogIn}>
        <p className={css.questionText}>
          Don`t have an account?{" "}
          <NavLink to="/signup" className={css.signUpLink}>
            Sign Up
          </NavLink>
        </p>
      </div>
      {/* <div className={css.forgotPasswordContainer}>
        <p className={css.questionText}>Forgot Password?</p>
        <NavLink to="/forgot-password" className={css.forgotPasswordLink}>
          Reset
        </NavLink>
      </div> */}
    </div>
  );
};

export default SignInForm;
