import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register, login } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import iconSprite from "../../icons/symbol-defs.svg";
import styles from "./SignUpForm.module.css";
import { useTranslation } from "react-i18next";

function SignUpForm() {
  const { t } = useTranslation();

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
      .email(t("auth_valid.invalid_email"))
      .required(t("auth_valid.required_email")),
    password: Yup.string()
      .min(6, t("auth_valid.password_min"))
      .required(t("auth_valid.password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("auth_valid.passwords_must_match"))
      .required(t("auth_valid.password_required")),
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
          setError(t("login_failed"));
          toast.error(t("login_error"));
        }
      } else {
        setError(t("registration_failed"));
        toast.error(t("registration_error_email_in_use"));
      }
    } catch (err) {
      const status = err.response?.data?.message;

      if (status === "409 Conflict") {
        setEmailError(t("email_already_in_use"));
      } else {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(`${t("registration_failed")}: ${errorMessage}`);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('sign_up.sign_up')}</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSignUp}
      >
        {({ values, touched, errors }) => (
          <Form className={styles.formContainer}>
            <div>
              <label htmlFor="email" className={styles.label}>
                {t("sign_up.email")}
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder={t("sign_up.enter_email")}
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
                {t("sign_up.enter_password")}
              </label>
              <div className={styles.inputContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder={t("sign_up.enter_password")}
                  className={`${styles.inputField} ${
                    errors.password && touched.password ? styles.inputError : ""
                  }`}
                />
                <button
                  className={`${styles.showPasswordBtn} ${styles.showPasswordTablet}`}
                  type="button"
                  onClick={handleClickShowPassword}
                  aria-label={showPassword ? t("sign_up.hide_password") : t("sign_up.show_password")}
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
                {t("sign_up.confirm_password")}
              </label>
              <div className={styles.inputContainer}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t("sign_up.repeat_password")}
                  className={`${styles.inputLastField} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                />
                <button
                  className={`${styles.showPasswordBtn} ${styles.showPasswordTablet}`}
                  type="button"
                  onClick={handleClickShowConfirmPassword}
                  aria-label={
                    showConfirmPassword ? t("sign_up.hide_password") : t("sign_up.show_password")
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
              <div className={styles.errorMessage}>{t("sign_up.passwords_do_not_match")}</div>
            )}
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submitButton}>
              {t('sign_up.sign_up')}
            </button>
          </Form>
        )}
      </Formik>
      <h2 className={styles.redirectTitle}>
        {t('sign_up.already_have_account')}{" "}
        <NavLink to="/signin" className={styles.accent}>
          {t('sign_up.sign_in')}
        </NavLink>
      </h2>
    </div>
  );
}

export default SignUpForm;
