import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import clsx from "clsx";
import styles from "./CalendarPagination.module.css";
import Icon from "../../shared/components/Icon/Icon";
import { fetchWater } from "../../redux/water/operations";
import { setActiveDay } from "../../redux/water/slice";
import { getISOStringDate } from "../../shared/helpers/getISOStringDate";
import { selectActiveDay, selectCurrentDay } from "../../redux/water/selectors";

const CalendarPagination = ({ toggleChart }) => {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectCurrentDay);

  console.log(activeDay);

  useEffect(() => {
    const [activeFullDate] = activeDay.split("T");
    const [activeYear, activeMonth, activeDay] = activeFullDate.split("-");

    const date = `${activeYear}-${activeMonth}-${activeDay}`;
    dispatch(fetchWater(date));
  }, [activeDay]);

  const convertedActiveDay = new Date(activeDay);

  const handlePrevMonth = () => {
    dispatch(
      setActiveDay(
        getISOStringDate(
          new Date(
            convertedActiveDay.setMonth(convertedActiveDay.getMonth() - 1)
          )
        )
      )
    );
  };

  const handleNextMonth = () => {
    let nextDate = new Date(
      convertedActiveDay.setMonth(convertedActiveDay.getMonth() + 1)
    );

    const currentDate = new Date();

    const isValidDate =
      nextDate.getFullYear() <= currentDate.getFullYear() &&
      nextDate.getMonth() <= currentDate.getMonth() &&
      nextDate.getDate() <= currentDate.getDate();

    if (isValidDate) {
      dispatch(setActiveDay(getISOStringDate(nextDate)));
    } else {
      dispatch(setActiveDay(getISOStringDate(currentDate)));
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const isLastMonth =
    currentMonth === convertedActiveDay.getMonth() &&
    currentYear === convertedActiveDay.getFullYear();

  const getMonthName = (month) => {
    const monthNames = [
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
    return monthNames[month];
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.buttonsContainer}>
        <button
          onClick={handlePrevMonth}
          type="button"
          className={styles.button}
        >
          <Icon
            className={clsx(styles.icon)}
            id="icon-arrow-left"
            height={20}
            width={20}
          />
        </button>

        <h3 className={styles.title}>
          {getMonthName(convertedActiveDay.getMonth())},{" "}
          {convertedActiveDay.getFullYear()}
        </h3>

        <button
          onClick={handleNextMonth}
          type="button"
          className={styles.button}
          disabled={isLastMonth}
        >
          <Icon
            className={clsx(styles.icon)}
            id="icon-arrow-right"
            height={20}
            width={20}
          />
        </button>
      </div>

      <button className={styles.button} type="button" onClick={toggleChart}>
        <Icon
          className={clsx(styles.icon)}
          id="icon-pie-chart-02"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default CalendarPagination;
