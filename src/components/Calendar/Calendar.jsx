import css from "./Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthlyRecords } from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import { useMemo, useState } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";
import { waterPerDay } from "../../redux/water/operations";

const Calendar = ({ daysInMonth, year, month }) => {
  const dispatch = useDispatch();
  const monthlyRecords = useSelector(selectMonthlyRecords);
  const dailyTarget = useSelector(selectDailyNorma);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = index + 1 > 9 ? index + 1 : `0${index + 1}`; //щоб відтворювати дату від 1 до 9
    const date = `${year}-${formattedMonth}-${formattedDay}`;

    dispatch(waterPerDay(date));
  };

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
