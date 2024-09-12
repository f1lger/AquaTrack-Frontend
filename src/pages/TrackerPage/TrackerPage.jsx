import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import styles from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>AquaTrack</h1>
      <WaterMainInfo />
    </div>
  );
};
export default TrackerPage;
