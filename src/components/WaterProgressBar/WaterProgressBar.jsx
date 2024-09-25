import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectTotalWater } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./WaterProgressBar.module.css";
import ChooseDate from "../ChooseDate/ChooseDate";

const WaterProgressBar = () => {
  const total = useSelector(selectTotalWater);
  const dailyNorma = useSelector(selectDailyNorma);

  const calculatePercentage = (dailyNorma, total) => {
    if (total === 0) {
      return 0;
    }
    return (total / dailyNorma) * 100;
  };

  const progress = Math.min(
    dailyNorma ? calculatePercentage(dailyNorma, total) : 0,
    100
  );

  const [currentProgress, setCurrentProgress] = useState({});

  useEffect(() => {
    const newSliderStyle = {
      background: `linear-gradient(to right, #9BE1A0 ${progress}%, #f0eff4 ${progress}%)`,
    };
    setCurrentProgress(newSliderStyle);
  }, [progress]);

  const getLeftPosition = (progress) => {
    if (progress <= 10) {
      return `calc(${progress}% + 5px)`;
    } else if (progress >= 90) {
      return `calc(${progress}% - 24px)`;
    } else {
      return `calc(${progress}% - 12px)`;
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>
        <ChooseDate />
      </h2>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderProgressWrapper}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className={styles.slider}
            style={currentProgress}
            readOnly
          />
          {progress > 0 && (
            <div
              className={styles.percentageLabel}
              style={{ left: getLeftPosition(progress) }}
            >
              {Math.round(progress)}%
            </div>
          )}
        </div>

        <div className={styles.sliderLabels}>
          <span
            className={styles.sliderNumbers}
            style={{
              visibility:
                progress === 0 || progress > 15 ? "visible" : "hidden",
            }}
          >
            0%
          </span>
          <span
            className={styles.sliderNumbers}
            style={{
              visibility:
                progress > 40 && progress <= 60
                  ? "hidden"
                  : progress >= 65
                  ? "visible"
                  : "visible",
            }}
          >
            50%
          </span>
          <span
            className={styles.sliderNumbers}
            style={{ visibility: progress >= 83 ? "hidden" : "visible" }}
          >
            100%
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
