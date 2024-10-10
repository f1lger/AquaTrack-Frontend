import { useSelector } from "react-redux";
import { selectCurrentDay, selectedDate } from "../../redux/water/selectors";
import css from "./ChooseDate.module.css";
import { useTranslation } from "react-i18next";

const ChooseDate = () => {
  const { t } = useTranslation();
  const today = useSelector(selectCurrentDay);
  const chosenDate = useSelector(selectedDate);
  let month = null;
  let day = null;

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

  if (chosenDate !== null) {
    const chosenMonth = chosenDate.split("-")[1];
    const chosenDay = chosenDate.split("-")[2];

    const monthName = months[parseInt(chosenMonth, 10) - 1];

    month = monthName;
    day = parseInt(chosenDay, 10);
  }

  const date = () => {
    if (chosenDate !== null) {
      if (today === chosenDate) {
        return t("month.today");
      } else {
        return `${day}, ${month}`;
      }
    } else {
      return t("month.today");
    }
  };

  return <p className={css.date}>{date()}</p>;
};

export default ChooseDate;
