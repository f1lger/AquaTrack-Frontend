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
    const [chosenYear, chosenMonth, chosenDay] = chosenDate.split("-");

    const monthName = months[parseInt(chosenMonth, 10) - 1];

    month = monthName;
    day = chosenDay;
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
