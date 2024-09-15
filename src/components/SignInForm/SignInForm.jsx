import PropTypes from "prop-types"; // Імпорт проптайпів
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "../../validationSchemas/authFormSchema";
import css from "./SignInForm.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { login } from "../../redux/auth/operations.js";


export const AuthFormLayout = ({ children, className }) => {
  return <div className={clsx(css.layout, { className })}>{children}</div>;
};

AuthFormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const SignInForm = ({ title = "Sign In", onSuccess }) => {
  const dispatch = useDispatch();

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
    dispatch(login({ email: newEmail, password }))
      .then((response) => {
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
    reset();
  };

  return (
    <AuthFormLayout className={css.layout}>
      <div className={css.signUpContainer}>
        <h2 className={css.title}>{title}</h2>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label
            className={clsx(css.field, { [css.errorField]: errors.email })}
          >
            Email
            <input
              className={clsx(css.input, { [css.inputError]: errors.email })}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
              })}
            />
          </label>
          {errors.email && (
            <p className={css.errorsMessage}>{errors.email.message}</p>
          )}

          <label
            className={clsx(css.field, { [css.errorField]: errors.password })}
          >
            Password
            <input
              className={clsx(css.input, {
                [css.inputError]: errors.password,
              })}
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </label>

          {errors.password && (
            <p className={css.errorsMessage}>
              {"must contain at least 8 characters"}
            </p>
          )}

          <input className={css.submit} type="submit" value="Sign In" />
        </form>
        <div className={css.inviteOnLogIn}>
          <p className={css.inviteText}>
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
