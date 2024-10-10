import UserPanel from "../UserPanel/UserPanel";
import MonthInfo from "../../components/MonthInfo/MonthInfo.jsx";
import DailyInfo from "../DaillyInfo/DailyInfo.jsx";
import css from "./WaterDetailedInfo.module.css";


import { useTranslation } from "react-i18next";

export default function WaterDetailedInfo({ openWaterModal }) {
  const { t } = useTranslation();

  return (
    <div className={css.WaterDetailedInfo}>
     
      <UserPanel />
      <h2 className={css.sectionTitle}>{t("welcome.title")}</h2>
      <DailyInfo openWaterModal={openWaterModal} />
      <MonthInfo />
    </div>
  );
}
