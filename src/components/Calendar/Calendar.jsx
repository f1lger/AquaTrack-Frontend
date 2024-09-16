import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentDay } from "../../redux/water/selectors";
import { fetchWater } from "../../redux/water/operations";
import { setActiveDay } from "../../redux/water/slice";

import styles from "../Calendar/Calendar.module.css";

export const Calendar = ({ dayslist }) => {
  const currentDay = useSelector(selectCurrentDay);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentDay) {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0] + "T00:00:00.000Z";
      dispatch(setCurrentDay(currentDate));
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentDay) {
      dispatch(fetchWater(new Date(currentDay).getTime()));
    }
  }, [currentDay, dispatch]);

  const handleClickOnDay = (day) => {
    dispatch(setActiveDay(day));
  };
  return (
    daysList?.length && (
      <ul className={styles.calendar}>
        {daysList.map((i, index) => (
          <li key={i.dateParam} onClick={() => handleClickOnDay(i.dateParam)}>
            <CalendarItem item={i} index={index} activeDay={activeDay} />
          </li>
        ))}
      </ul>
    )
  );
};
