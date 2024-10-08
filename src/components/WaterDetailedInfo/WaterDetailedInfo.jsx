import UserPanel from "../UserPanel/UserPanel";
import MonthInfo from "../../components/MonthInfo/MonthInfo.jsx";
import DailyInfo from "../DaillyInfo/DailyInfo.jsx";
import css from "./WaterDetailedInfo.module.css";

export default function WaterDetailedInfo({ openWaterModal }) {
  return (
    <div className={css.WaterDetailedInfo}>
      <UserPanel />
      <DailyInfo openWaterModal={openWaterModal} />
      <MonthInfo />
    </div>
  );
}
