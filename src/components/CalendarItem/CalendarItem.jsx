import clsx from "clsx";
import { useSelector } from "react-redux";
// import { selectDailyNorma } from "../../redux/auth/selectors";
import styles from "./CalendarItem.module.css";

const CalendarItem = ({ data }) => {
  console.log(data);

  // const countWater = useSelector(selectDailyNorma);
  // const calculateIntakePercentage = (totalDailyWater) => {
  //   if (!countWater) {
  //     return 0;
  //   }
  //   const waterInMililiters = countWater * 1000;
  //   const percentage = (totalDailyWater / waterInMililiters) * 100;
  //   let rounded = percentage.toFixed(1);
  //   return rounded.endsWith(".0") ? parseInt(rounded, 10) : parseFloat(rounded);
  // };
  return (
    <div className={styles.container}>
      <button
        className={clsx(
          styles.button,
          data.isToday && styles.activeButton,
          data.waterPercentage >= 100 && styles.fullDayButton
          // calculateIntakePercentage(item.totalDailyWater) >= 100 &&
          // styles.fullDayButton
        )}
      >
        {data.date}
      </button>
      <span className={styles.label}>
        {data.waterPercentage}%
        {/* {calculateIntakePercentage(item?.totalDailyyWater)}% */}
      </span>
    </div>
  );
};

export default CalendarItem;
