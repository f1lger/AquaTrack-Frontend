import styles from "./WaterDetailedInfo.module.css";
import MonthInfo from "../MonthInfo/MonthInfo";
import DailyInfo from "../DailyInfo/DailyInfo";
import UserPanel from "../UserPanel/UserPanel";

export default function WaterDetailedInfo() {
  return (
    <div className={styles.WaterDetailedInfo}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}
