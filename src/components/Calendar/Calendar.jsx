import css from "./Calendar.module.css";
import { useSelector } from "react-redux";
import { selectMonthlyRecords } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import clsx from "clsx";

const Calendar = ({ daysInMonth }) => {
  const monthlyRecords = useSelector(selectMonthlyRecords);
  const dailyTarget = useSelector(selectDailyNorma);

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const record = monthlyRecords.find((rec) => rec.hasOwnProperty(day));
    const waterConsumed = record ? record[day] : 0;
    const percentage = (waterConsumed / dailyTarget) * 100;

    return Math.min(percentage, 100).toFixed(0);
  });

  return (
    <div>
      <ul className={css.calendar}>
        {daysArray.map((percentage, index) => (
          <li key={index + 1} className={css.calendarDay}>
            <button
              className={clsx(
                percentage === "100" ? css.waterCompleted : css.day
              )}
            >
              {index + 1}
            </button>
            <div>{percentage}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
