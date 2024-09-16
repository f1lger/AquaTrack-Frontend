import styles from "../WaterLoader/WaterLoader.module.css";

export const WaterLoade = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
