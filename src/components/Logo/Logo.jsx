import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <NavLink to="/">Aquatrack</NavLink>
    </div>
  );
}

export default Logo;
