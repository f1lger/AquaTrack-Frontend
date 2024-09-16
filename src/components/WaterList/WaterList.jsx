import WaterItem from "../WaterItem/WaterItem";
import styles from "../WaterList/WaterList.module.css";

const WaterList = () => {
  return (
    <div className={styles.daily_info_container}>
      {" "}
      <WaterItem />{" "}
    </div>
  );
};

export default WaterList;
