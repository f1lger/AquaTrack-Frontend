import { Link } from "react-router-dom";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import styles from "./WelcomeSection.module.css";

function WelcomeSection() {
  const isSignUpDisabled = false;
  const isSignInDisabled = false;

  return (
    <div className={styles.wrapper}>
      <Logo />
      <h2 className={styles.subTitle}>Record daily water intake and track</h2>
      <h1 className={styles.mainTitle}>Water consumption tracker</h1>
      <ul className={styles.btnGroup}>
        <li>
          <Link
            to="/signup"
            className={clsx(
              css.button,
              styles.signUp,
              !isSignUpDisabled && styles.signUpHover,
              isSignUpDisabled && styles.signUpDisabled
            )}
          >
            Try tracker
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className={clsx(
              css.button,
              css.signIn,
              !isSignInDisabled && styles.signInHover,
              isSignInDisabled && styles.signInDisabled
            )}
          >
            Sign in
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default WelcomeSection;
