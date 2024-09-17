import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
// import { useTranslation } from "react-i18next";
import { selectCurrentDay } from "../../redux/water/selectors";
import styles from "./ChooseDate.module.css";

export default function ChooseDate() {
  const [currentDate, setCurrentDate] = useState("");
  const { t, i18n } = useTranslation();
  const selectedDay = useSelector(selectCurrentDay);

  useEffect(() => {
    if (new Date(selectedDay).toDateString() === new Date().toDateString()) {
      setCurrentDate(t("Today water"));
    } else {
      const date = new Date(selectedDay);
      const monthKey = `Month ${date
        .toLocaleString("en-US", { month: "long" })
        .toLowerCase()}`;
      const translatedMonth = t(monthKey);
      const formattedDate = `${date.getDate()}, ${translatedMonth}`;
      setCurrentDate(formattedDate);
    }
  }, [selectedDay, t]);

  return (
    <div>
      {" "}
      <h2
        className={clsx(styles.currentDate, {
          [styles.currentDateUa]: i18n.language === "ua",
        })}
      >
        {currentDate}
      </h2>
    </div>
  );
}
