import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from '../../components/Logo/Logo';
import styles from './SignUpPage.module.css'
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Logo />
        <SignUpForm />
      </div>
      <div className={styles.advantages}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
