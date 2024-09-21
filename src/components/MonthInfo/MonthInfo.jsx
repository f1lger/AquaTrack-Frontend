import { useDispatch } from "react-redux";
import { waterPerMonth } from "../../redux/water/operations";
import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";

const MonthInfo = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);

  const handleMonthChange = (direction) => {
    let newMonth = month + direction;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  useEffect(() => {
    const formattedMonth = String(month).padStart(2, "0");
    const date = `${year}-${formattedMonth}`;

    dispatch(waterPerMonth(date));
  }, [dispatch, year, month]);

  return (
    <div>
      <CalendarPagination
        handleMonthChange={handleMonthChange}
        month={month}
        year={year}
      />
      <Calendar daysInMonth={daysInMonth} />
    </div>
  );
};

export default MonthInfo;
