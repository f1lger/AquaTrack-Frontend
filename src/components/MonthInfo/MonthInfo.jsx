import { useState } from "react";
//import { CalendarPagination } from "../CalendarPagination/CalendarPagination";
import Chart from "../Chart/Chart";
import { Calendar } from "../Calendar/Calendar";
import styles from "./MonthInfo.module.css";
// import CalendarPagination from "../CalendarPagination/CalendarPagination";

const MonthInfo = () => {
  const [isChart, setIsChart] = useState(false);

  const toggleChart = () => setIsChart(!isChart);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.dateWrapper}>
        <h2 className={styles.title}>Month</h2>

        {/* <CalendarPagination toggleChart={toggleChart} /> */}
      </div>

      {isChart ? <Chart /> : <Calendar />}
    </div>
  );
};

export default MonthInfo;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import clsx from "clsx";
// import {
//   selectDailyRecords,
//   selectMonthlyRecords,
// } from "../../redux/water/selectors.js";
// import Calendar from "../Calendar/Calendar.jsx";
// import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
// // import WaterStatistic from "../../WaterStatistic/WaterStatistic.jsx";
// import { getMonthInfo } from "../../redux/water/operations.js";
// import styles from "./MonthInfo.module.css";

// export default function MonthInfo() {
//   const [date, setDate] = useState(new Date());
//   const [showStat, setShowStat] = useState(false);
//   const { t, i18n } = useTranslation();
//   const daysList = useSelector(selectMonthlyRecords);
//   const dayWater = useSelector(selectDailyRecords);
//   const dispatch = useDispatch();

//   const toggleView = () => {
//     setShowStat((showStat) => !showStat);
//   };

//   useEffect(() => {
//     dispatch(getMonthInfo(new Date(date).getTime()));
//   }, [dispatch, date, dayWater]);

//   const handlePrevMonth = () => {
//     setDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       return newDate;
//     });
//   };

//   const handleNextMonth = () => {
//     setDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       return newDate;
//     });
//   };

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return (
//     <div className={styles.monthInfoContainer}>
//       <div className={styles.monthInfoPaginationContainer}>
//         <h2
//           className={clsx(styles.title, {
//             [styles.titleUa]: i18n.language === "ua",
//           })}
//         >
//           {showStat ? "Statistic" : t("Month water")}
//         </h2>
//         <CalendarPagination
//           handlePrevMonth={handlePrevMonth}
//           handleNextMonth={handleNextMonth}
//           monthNames={monthNames}
//           date={date}
//           isOpen={showStat}
//           setIsOpen={toggleView}
//         />
//       </div>
//       {showStat ? <WaterStatistic /> : <Calendar daysList={daysList} />}
//     </div>
//   );
// }
