import css from "./Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedDate,
  selectMonthlyRecords,
} from "../../redux/water/selectors";
import { selectDailyNorma } from "../../redux/auth/selectors";
import { useMemo, useState } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";
import { waterPerDay } from "../../redux/water/operations";
import { setSelectedDate } from "../../redux/water/slice";

const Calendar = ({ daysInMonth, year, month }) => {
  const dispatch = useDispatch();
  const monthlyRecords = useSelector(selectMonthlyRecords);
  const dailyTarget = useSelector(selectDailyNorma);
  const chosenDate = useSelector(selectedDate);
  let selectedMonth = null;

  const [activeBtnIndex, setActiveBtnIndex] = useState(null);

  if (chosenDate !== null) {
    const month = chosenDate.split("-")[1];

    selectedMonth = parseInt(month, 10);
  }

  const handleButtonClick = (index) => {
    setActiveBtnIndex(index);
    const formattedDay = String(index + 1).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const date = `${year}-${formattedMonth}-${formattedDay}`;

    if (date !== chosenDate) {
      dispatch(waterPerDay(date));
      dispatch(setSelectedDate(date));
    }
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
              isActive={activeBtnIndex === index && month === selectedMonth}
              onClick={() => handleButtonClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
