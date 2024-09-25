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

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
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
      dispatch(sendPasswordResetEmail(data.email));
      toast.success("Check your email for password reset instructions");
    } catch (error) {
      toast.error("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Forgot Password?</h2>
      <p>
        Enter your email and we&apos;ll send you a link to reset your password
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <span className={css.label}>Email: </span>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={clsx(css.input, { [css.inputError]: errors.email })}
          />
          <p className={css.errorMessage}>{errors.email?.message}</p>
        </label>
        <button type="submit" className={css.submitbtn}>
          Send reset email
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

ForgotPasswordForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default ForgotPasswordForm;
