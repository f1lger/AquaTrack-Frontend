import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { waterPerDay } from "../../redux/water/operations";
import { selectTotalWater } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./WaterProgressBar.module.css";

const WaterProgressBar = () => {
  // const dispatch = useDispatch();
  const total = useSelector(selectTotalWater);
  const dailyNorma = useSelector(selectDailyNorma) * 1000;
  
  const calculatePercentage = (dailyNorma, total) => {
    if (total === 0) {
      return 0;
    }
    return (total / dailyNorma) * 100;
  };
  const progress = dailyNorma ? calculatePercentage(dailyNorma, total) : 0;

  const [currentProgress, setCurrentProgress] = useState({});

  // useEffect(() => {
  //   if (total === 0) {
  //     return;
  //   }

  //   const today = new Date().toISOString().split("T")[0];
  //   dispatch(waterPerDay(today))
  //     .unwrap()
  //     .catch((error) => {
  //       console.error("Error fetching water data:", error);
  //     });
  // }, [dispatch, total]);

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
