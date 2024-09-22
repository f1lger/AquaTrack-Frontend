import UserPanel from "../UserPanel/UserPanel";
import MonthInfo from "../../components/MonthInfo/MonthInfo.jsx";
import css from "./WaterDetailedInfo.module.css"
export default function WaterDetailedInfo() {
  return (
    <div className={css.WaterDetailedInfo}>
      <UserPanel />
      <MonthInfo />
    </div>
  );
}
