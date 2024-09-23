import { format, isSameDay, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "../../redux/water/selectors";

import css from "./ChooseDate.module.css";

const ChooseDate = () => {
  const chosenDate = useSelector(selectSelectedDate);
  console.log(chosenDate);
  const currentDate = new Date().toISOString().split("T")[0]; // Поточна дата

  const selectedDateObj = parseISO(chosenDate); // Перетворення обраної дати на об'єкт Date

  const formatDate = (date) => {
    return format(date, "d, MMMM");
  };

  const isToday = (date1, date2) => {
    return isSameDay(date1, date2);
  };

  return (
    <h2 className={css.date}>
      {isToday(currentDate, selectedDateObj)
        ? "Today"
        : formatDate(selectedDateObj)}
    </h2>
  );
};

export default ChooseDate;
