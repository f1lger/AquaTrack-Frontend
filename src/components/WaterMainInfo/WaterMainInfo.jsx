import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import styles from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AquaTrack</h1>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
