import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import Logo from "../../components/Logo/Logo";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./ForgotPassword.module.css"

const ForgotPasswordPage = () => {
  return (
    <div className={css.ForgotSection}>
      <div className={css.container}>
        <Logo />
        <ForgotPasswordForm />
      </div>
      <div className={css.advantages}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;