import { useSelector } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css"

export default function UserPanel() {
  const userName = useSelector(selectName);
  return (
    <div className={css.userPanelCont}>
      <div className={css.welcomeTitle}>
        Hello, <span>{userName ? userName : "user"}</span>
      </div>
      <UserBar userName={userName} />
    </div>
  );
}
