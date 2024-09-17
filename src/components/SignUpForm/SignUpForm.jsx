import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import styles from "./SignUpForm.module.css";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
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
      const result = await dispatch(register(userInfo));
      if (register.fulfilled.match(result)) {
        console.log("registration succeed:", result.payload);
        navigate("/tracker");
      } else {
        console.log("registration failed:", result.payload);

        setError("registration failed");
      }
      resetForm();
      setError("");
    } catch (err) {
      console.log("registration error catch:", err.message);
      setError("Registration failed.Please try again");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign up</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSignUp}
      >
        {() => (
          <Form className={styles.formContainer}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={styles.inputField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={styles.inputField}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                Repeat password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat password"
                className={styles.inputLastField}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorMessageConfirm}
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submitButton}>
              Sign up
            </button>
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
