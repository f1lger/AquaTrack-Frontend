<<<<<<< Updated upstream
import styles from "../WaterDetailedInfo/WaterDetailedInfo.module.css";
import UserPanel from "../../components/UserPanel/UserPanel";
import DailyInfo from "../../components/DailyInfo/DailyInfo";
import MonthInfo from "../../components/MonthInfo/MonthInfo";

export default function WaterDetailedInfo() {
  return (
    <div className={styles.WaterDetailedInfoContainer}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}
=======
import { UserPanel } from "./UserPanel/UserPanel";
import styles from "./WaterDetailedInfo.module.css";

export const WaterDetailedInfo = ({ style }) => {
  return (
    <div className={styles.container}>
      <p>Hello, Nadia!</p>
      <UserPanel />
    </div>
  );
};
>>>>>>> Stashed changes
