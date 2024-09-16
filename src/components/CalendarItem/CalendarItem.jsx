import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "../CalendarItem/CalendarItem.module.css";

const CalendarItem = ({ item, currentDay, index }) => {
  const countWater = useSelector(selectDailyNorma);
  const calculateIntakePercentage = (totalDailyWater) => {
    if (!countWater) {
      return 0;
    }
    const waterInMililiters = countWater * 1000;
    const percentage = (totalDailyWater / waterInMililiters) * 100;
    let rounded = percentage.toFixed(1);
    return rounded.endsWith(".0") ? parseInt(rounded, 10) : parseFloat(rounded);
  };
  return (
    <div className={styles.container}>
      <button
        className={clsx(
          css.button,
          item.dateParam == currentDay && css.activeButton,
          calculateIntakePercentage(item.totalDailyWater) >= 100 &&
            css.fullDayButton
        )}
      >
        {index + 1}
      </button>
      <span className={styles.label}>
        {calculateIntakePercentage(item?.totalDailyyWater)}%
      </span>
    </div>
  );
};

export default CalendarItem;
