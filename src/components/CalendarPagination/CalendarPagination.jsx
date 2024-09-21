import css from "./CalendarPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const CalendarPagination = ({ handleMonthChange, year, month }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[parseInt(month) - 1];

  return (
    <div className={css.paginationWrapper}>
      <p className={css.monthTitle}>Month</p>
      <div className={css.paginationControll}>
        <button
          onClick={() => handleMonthChange(-1)}
          className={css.paginationBtn}
        >
          <IoIosArrowBack size={18} color="#323F47" />
        </button>
        <p className={css.monthName}>
          {monthName}, {year}
        </p>
        <button
          onClick={() => handleMonthChange(+1)}
          className={css.paginationBtn}
        >
          <IoIosArrowForward size={18} color="#323F47" />
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
