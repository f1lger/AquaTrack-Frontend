import { Link } from "react-router-dom";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import styles from "./WelcomeSection.module.css";

import { useTranslation } from 'react-i18next';

function WelcomeSection() {
  const { t } = useTranslation();
  
  const isSignUpDisabled = false;
  const isSignInDisabled = false;

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      
      <h2 className={styles.subTitle}>{t("welcome.description")}</h2>
      <h1 className={styles.mainTitle}>{t("welcome.title")}</h1>
      <ul className={styles.btnGroup}>
        <li>
          <Link
            to="/signup"
            className={clsx(
              styles.button,
              styles.signUp,
              !isSignUpDisabled && styles.signUpHover,
              isSignUpDisabled && styles.signUpDisabled
            )}
          >
          {t("welcome.try_tracker")}
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className={clsx(
              styles.button,
              styles.signIn,
              !isSignInDisabled && styles.signInHover,
              isSignInDisabled && styles.signInDisabled
            )}
          >
          {t("welcome.sign_in")}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default WelcomeSection;
