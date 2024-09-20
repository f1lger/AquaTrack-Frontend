import css from "./CalendarPagination.module.css";

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
          ←
        </button>
        <p className={css.monthName}>
          {monthName}, {year}
        </p>
        <button
          onClick={() => handleMonthChange(+1)}
          className={css.paginationBtn}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default CalendarPagination;
