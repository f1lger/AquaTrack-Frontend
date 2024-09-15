import { useSelector } from "react-redux";
import { selectTotalWater } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./WaterProgressBar.module.css";
import { useState, useEffect } from "react";

const WaterProgressBar = () => {
  const total = useSelector(selectTotalWater);
  const dailyNorma = useSelector(selectDailyNorma);
  const progress = dailyNorma ? (total / dailyNorma) * 100 : 0;

  const [currentProgress, setCurrentProgress] = useState({});

  useEffect(() => {
    const newSliderStyle = {
      background: `linear-gradient(to right, #9BE1A0 ${progress}%, #f0eff4 ${progress}%)`,
    };
    setCurrentProgress(newSliderStyle);
  }, [progress]);

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Today</h2>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          className={styles.slider}
          style={currentProgress}
          readOnly
        />
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
