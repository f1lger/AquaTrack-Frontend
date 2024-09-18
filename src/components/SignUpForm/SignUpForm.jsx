import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register, login } from "../../redux/auth/operations";
import { toast } from "react-toastify";
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

      const registrationResult = await dispatch(register(userInfo));
      if (register.fulfilled.match(registrationResult)) {
        const { email, password } = userInfo;

        const loginResult = await dispatch(login({ email, password }));
        if (login.fulfilled.match(loginResult)) {
          navigate("/tracker");
        } else {
          setError("login failed");
          toast.error("Login error, try again");
        }
      } else {
        setError("registration failed");
        toast.error("Registration error, try again");
      }

      resetForm();
      setError("");
    } catch (err) {

      const errorMessage = err.response?.data?.message || err.message;
      
      setError(errorMessage);
      toast.error(`Registration failed: ${errorMessage}`);
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
