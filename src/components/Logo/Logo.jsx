import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Logo() {
  return (
    <div className={styles.logo}>
      <NavLink to="/">Aquatrack</NavLink>
      <LanguageSwitcher />
  
    </div>
  );
}

export default Logo;
