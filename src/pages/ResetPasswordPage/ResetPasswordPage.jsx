import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import Logo from "../../components/Logo/Logo";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  return (
    <div className={css.ResetSection}>
      <div className={css.container}>
        <Logo />
        <ResetPasswordForm />
      </div>
      <div className={css.advantages}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
