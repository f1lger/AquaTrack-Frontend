import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import styles from "./WaterMainInfo.module.css";
import { Link } from "react-router-dom";


const WaterMainInfo = ({ openWaterModal }) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumb} />
      <Link to="/">
        <h1 className={styles.title}>AquaTrack</h1>
      </Link>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn openWaterModal={openWaterModal} />
    </div>
  );
};

export default WaterMainInfo;
