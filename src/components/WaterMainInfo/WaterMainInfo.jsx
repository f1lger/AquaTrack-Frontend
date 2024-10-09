import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import styles from "./WaterMainInfo.module.css";
import { Link } from "react-router-dom";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import { useTranslation } from "react-i18next";

const WaterMainInfo = ({ openWaterModal }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
       <LanguageSwitcher />
      <div className={styles.thumb} />
      <Link to="/">
        <h1 className={styles.title}>{t("welcome.title")}</h1>
      </Link>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn openWaterModal={openWaterModal} />
    </div>
  );
};

export default WaterMainInfo;
