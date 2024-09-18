import SignInForm from "../../components/SignInForm/SignInForm";
import Logo from "../../components/Logo/Logo";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignInPage.module.css"

const SignInPage = () => {
  return (
    <div className={css.signInSection}>
      <div className={css.container}>
        <Logo />
        <SignInForm />
      </div>
      <div className={css.advantages}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;