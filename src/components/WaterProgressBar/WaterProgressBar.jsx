import styles from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Today</h2>
      <div className={styles.sliderWrapper}>
        <input type="range" min="0" max="100" className={styles.slider} />
        <div className={styles.sliderLabels}>
          <span className={styles.sliderNumbers}>0%</span>
          <span className={styles.sliderNumbers}>50%</span>
          <span className={styles.sliderNumbers}>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
