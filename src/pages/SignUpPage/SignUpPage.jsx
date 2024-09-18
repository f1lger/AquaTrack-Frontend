import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <SignUpForm />
    </div>
  );
}
