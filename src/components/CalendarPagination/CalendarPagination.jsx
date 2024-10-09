import css from "./CalendarPagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

const CalendarPagination = ({ handleMonthChange, year, month }) => {
  const { t } = useTranslation();

  const months = [
    t("month.january"),
    t("month.february"),
    t("month.march"),
    t("month.april"),
    t("month.may"),
    t("month.june"),
    t("month.july"),
    t("month.august"),
    t("month.september"),
    t("month.october"),
    t("month.november"),
    t("month.december"),
  ];

  const monthName = months[parseInt(month) - 1];

  return (
    <div className={css.paginationWrapper}>
      <p className={css.monthTitle}>{t("month.month")}</p>
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
