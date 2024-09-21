import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/auth/operations";

import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import styles from "./WaterMainInfo.module.css";


const WaterMainInfo = ({ openWaterModal }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.thumb} />
      <h1 className={styles.title}>AquaTrack</h1>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn openWaterModal={openWaterModal} />
    </div>
  );
};

export default WaterMainInfo;
