import { useSelector } from "react-redux";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./WaterDailyNorma.module.css";
import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const dailyNorma = useSelector(selectDailyNorma);

  return (
    <div className={styles.normaWrapper}>
      <p className={styles.normaValue}>{(dailyNorma / 1000).toFixed(1)} L</p>
      <p className={styles.normaDesc}>{t("settings.daily_norm")}</p>
    </div>
  );
};

export default WaterDailyNorma;
