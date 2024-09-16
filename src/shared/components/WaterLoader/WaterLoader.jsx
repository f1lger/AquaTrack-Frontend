import styles from "../WaterLoader/WaterLoader.module.css";

export const WaterLoader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};
