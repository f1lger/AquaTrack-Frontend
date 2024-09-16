import styles from "../WaterList/WaterList.module.css";
import WaterItem from "../../components/WaterItem/WaterItem";

export const WaterList = () => {
  return (
    <div className={styles.daily_info_container}>
      {" "}
      <WaterItem />{" "}
    </div>
  );
};
