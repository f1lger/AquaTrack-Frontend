import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register, login } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import iconSprite from "../../icons/symbol-defs.svg";
import GoogleAuthBtn from "../GoogleLoginButton/GoogleAuthBtn";
import styles from "./SignUpForm.module.css";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string()
      .min(3, "Must contain at least 3 characters")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please, repeat your password"),
  });

  const handleSignUp = async (values, { resetForm }) => {
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };

      const registrationResult = await dispatch(register(userInfo));
      if (register.fulfilled.match(registrationResult)) {
        const { email, password } = userInfo;

        const loginResult = await dispatch(login({ email, password }));
        if (login.fulfilled.match(loginResult)) {
          navigate("/tracker");
          resetForm();
        } else {
          setError("Login failed");
          toast.error("Login error, try again");
        }
      } else {
        setError("Registration failed");
        toast.error("Registration error. Email already in use");
      }
    } catch (err) {
      const status = err.response?.data?.message;

      if (status === "409 Conflict") {
        setEmailError("Email already in use");
        console.log(emailError);
      } else {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(`Registration failed: ${errorMessage}`);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign up</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSignUp}
      >
        {({ values, touched, errors }) => (
          <Form className={styles.formContainer}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`${styles.inputField} ${
                  errors.email && touched.email ? styles.inputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
              {emailError && (
                <div className={styles.errorMessage}>{emailError}</div>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`${styles.inputField} ${
                    errors.password && touched.password ? styles.inputError : ""
                  }`}
                />
                <button
                  className={`${styles.showPasswordBtn} ${styles.showPasswordTablet}`}
                  type="button"
                  onClick={handleClickShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className={styles.icon}>
                      <use href={`${iconSprite}#icon-eye`}></use>
                    </svg>
                  ) : (
                    <svg className={styles.icon}>
                      <use href={`${iconSprite}#icon-eye-off`}></use>
                    </svg>
                  )}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Repeat password
              </label>
              <div className={styles.inputContainer}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  className={`${styles.inputLastField} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                />
                <button
                  className={`${styles.showPasswordBtn} ${styles.showPasswordTablet}`}
                  type="button"
                  onClick={handleClickShowConfirmPassword}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg className={styles.icon}>
                      <use href={`${iconSprite}#icon-eye`}></use>
                    </svg>
                  ) : (
                    <svg className={styles.icon}>
                      <use href={`${iconSprite}#icon-eye-off`}></use>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {values.password !== values.confirmPassword && (
              <div className={styles.errorMessage}>Passwords do not match</div>
            )}
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submitButton}>
              Sign up
            </button>
            <p> or </p>
            <GoogleAuthBtn>Sign up with Google</GoogleAuthBtn>
          </Form>
        )}
      </Formik>
      <h3 className={styles.redirectTitle}>
        Already have an account?{" "}
        <NavLink to="/signin" className={styles.accent}>
          Sign In
        </NavLink>
      </h3>
    </div>
  );
}

export default SignUpForm;
