import { useSelector } from "react-redux";
import { selectCurrentDay, selectedDate } from "../../redux/water/selectors";
import css from "./ChooseDate.module.css";

const ChooseDate = () => {
  const today = useSelector(selectCurrentDay);
  const chosenDate = useSelector(selectedDate);
  let month = null;
  let day = null;

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
        return "Today";
      } else {
        return `${day}, ${month}`;
      }
    } else {
      return "Today";
    }
  };

  return <p className={css.date}>{date()}</p>;
};

export default ChooseDate;
