import styles from "./Calendar.module.css";
import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import {
  selectCurrentDay,
  selectDailyRecords,
  selectMonthlyRecords,
  selectWaterLoading,
} from "../../redux/water/selectors";
import { getMonthInfo } from "../../redux/water/operations";
import { selectUserWaterNorm } from "../../redux/user/selectors";
import { getUserInfo } from "../../redux/user/operations";
import { getISOStringDate } from "../../shared/helpers/getISOStringDate";
import CalendarItem from "../CalendarItem/CalendarItem";

export const getNumOfDaysInMonth = (chosenDate) => {
  const year = chosenDate.getFullYear();
  const month = chosenDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return daysInMonth;
};

const getDailyAmount = ({ day, month, year, response }) => {
  const corMonth = month < 10 ? `0${month}` : month;
  const corDay = day < 10 ? `0${day}` : day;

  const dayString = `${year}-${corMonth}-${corDay}`;
  const dayData = response?.find((entry) => {
    return entry.time === dayString;
  });
  return dayData ? dayData.amount : 0;
};

const getDailyWaterPercentage = ({ chosenDate, response, dailyNorma }) => {
  let isEnabled = true;
  const data = [];
  const chosenMonth = chosenDate.getMonth() + 1;
  const chosenYear = chosenDate.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const isCurrentMonthAndYear =
    currentYear === chosenYear && currentMonth === chosenDate.getMonth();
  const daysInMonth = getNumOfDaysInMonth(chosenDate);

  for (let day = 1; day <= daysInMonth; day++) {
    const percentage = dailyNorma
      ? Math.round(
          (100 *
            getDailyAmount({
              day,
              month: chosenMonth,
              year: chosenYear,
              response,
            })) /
            (1000 * dailyNorma)
        )
      : 0;
    const dailyWaterPercentage = percentage > 100 ? 100 : percentage;
    const isToday = isCurrentMonthAndYear && currentDay === day;

    const newDay = new Date(getISOStringDate(chosenDate));
    newDay.setDate(day);

    const clickedDay = getISOStringDate(newDay);

    data.push({
      date: day,
      waterPercentage: dailyWaterPercentage,
      isToday,
      isEnabled,
      chosenDate: getISOStringDate(chosenDate),
      clickedDay,
    });

    if (isToday) isEnabled = false;
  }
  return data;
};

export const Calendar = () => {
  const dispatch = useDispatch();
  const chosenDate = useSelector(selectCurrentDay);
  const waterMonth = useSelector(selectMonthlyRecords);
  const waterDaily = useSelector(selectDailyRecords);

  const loading = useSelector(selectWaterLoading);
  const waterNorma = useSelector(selectUserWaterNorm);

  useEffect(() => {
    const year = new Date(chosenDate).getFullYear();
    let month = new Date(chosenDate).getMonth() + 1;

    month = month < 10 ? `0${month}` : month;

    dispatch(getMonthInfo(`${year}-${month}`));
    dispatch(getUserInfo());
  }, [dispatch, chosenDate]);

  const daysWithWater = useMemo(
    () =>
      getDailyWaterPercentage({
        chosenDate: new Date(chosenDate),
        response: waterMonth ? waterMonth : [],
        dailyNorma: waterNorma,
      }),
    [chosenDate, loading, waterMonth, waterNorma, waterDaily]
  );

  return (
    <div>
      <ul className={styles.days}>
        {daysWithWater.map((day) => {
          return (
            <li key={day.date} className={clsx(styles.day)}>
              <CalendarItem data={day} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
