import { useSelector } from "react-redux";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectDailyNorma);

  return (
    <div className={styles.normaWrapper}>
      <p className={styles.normaValue}>{(dailyNorma / 1000).toFixed(1)} L</p>
      <p className={styles.normaDesc}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
