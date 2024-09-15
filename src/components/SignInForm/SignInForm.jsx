import PropTypes from "prop-types"; // Імпорт проптайпів
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "../../validationSchemas/authFormSchema";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { login } from "../../redux/auth/operations.js";
import { useState } from "react";
import iconSprite from "../../icons/symbol-defs.svg";
import Logo from "../Logo/Logo.jsx";

export const AuthFormLayout = ({ children, className }) => {
  return <div className={clsx(css.layout, { className })}>{children}</div>;
};

AuthFormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = (data) => {
    const { email, password } = data;
    const newEmail = email.toLowerCase();
    dispatch(login({ email: newEmail, password }));
    reset();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
      <AuthFormLayout className={css.layout}>
       <Logo className={css.logo}></Logo>   
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
          <button type="submit" className={css.submit}>
            Sign in
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
      </div>
    </AuthFormLayout>
  );
};

SignInForm.propTypes = {
  title: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default SignInForm;
