import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";
import styles from "./SignUpPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.signUpSection}>
        <Logo />
        <SignUpForm />
      </div>
      <div className={styles.advSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
