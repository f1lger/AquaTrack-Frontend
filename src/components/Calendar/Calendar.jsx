import css from "./Calendar.module.css";
import { useSelector } from "react-redux";
import { selectMonthlyRecords } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import { useMemo } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";

const Calendar = ({ daysInMonth }) => {
  const monthlyRecords = useSelector(selectMonthlyRecords);
  const dailyTarget = useSelector(selectDailyNorma);

  const daysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const record = monthlyRecords.find((rec) => rec[day]);
      const waterConsumed = record ? record[day] : 0;
      const percentage = (waterConsumed / dailyTarget) * 100;
      return Math.min(percentage, 100).toFixed(0);
    });
  }, [daysInMonth, monthlyRecords, dailyTarget]);

  return (
    <div>
      <ul className={css.calendar}>
        {daysArray.map((percentage, index) => (
          <li key={index + 1} className={css.calendarDay}>
            <CalendarItem index={index} percentage={percentage} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
