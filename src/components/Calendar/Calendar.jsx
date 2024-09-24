import css from "./Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDailyRecords,
  selectMonthlyRecords,
} from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import { useEffect, useMemo, useState } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";
import { waterPerDay, waterPerMonth } from "../../redux/water/operations";

const Calendar = ({ daysInMonth, year, month }) => {
  const dispatch = useDispatch();
  const monthlyRecords = useSelector(selectMonthlyRecords);
  const dailyTarget = useSelector(selectDailyNorma);
  const dailyRecords = useSelector(selectDailyRecords);

  const [activeIndex, setActiveIndex] = useState(null);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const formattedMonth = `${year}-${String(month).padStart(2, "0")}`;

  useEffect(() => {
    dispatch(waterPerMonth(formattedMonth));
  }, [dispatch, formattedMonth]);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    const date = `${year}-${String(month).padStart(2, "0")}-${index + 1}`;
    dispatch(waterPerDay(date));
  };

  const daysArray = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;

      if (
        day === currentDay &&
        month === currentMonth &&
        year === currentYear
      ) {
        const totalWaterToday = dailyRecords.reduce(
          (sum, record) => sum + record.amount,
          0
        );
        const percentageToday = (totalWaterToday / dailyTarget) * 100;
        return Math.min(percentageToday, 100).toFixed(0);
      }

      const record = monthlyRecords.find((rec) => rec[day]);
      const waterConsumed = record ? record[day] : 0;
      const percentage = (waterConsumed / dailyTarget) * 100;
      return Math.min(percentage, 100).toFixed(0);
    });
  }, [
    daysInMonth,
    monthlyRecords,
    dailyTarget,
    dailyRecords,
    currentDay,
    currentMonth,
    currentYear,
  ]);

  return (
    <div>
      <ul className={css.calendar}>
        {daysArray.map((percentage, index) => (
          <li key={index + 1} className={css.calendarDay}>
            <CalendarItem
              index={index}
              percentage={percentage}
              isActive={activeIndex === index}
              onClick={() => handleButtonClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
