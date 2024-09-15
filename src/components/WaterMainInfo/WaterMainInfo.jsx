import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWater } from "../../redux/water/operations";
import { fetchUser } from "../../redux/auth/operations";

import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import styles from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWater());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumb} />
      <h1 className={styles.title}>AquaTrack</h1>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
