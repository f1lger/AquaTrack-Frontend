import css from "./CalendarItem.module.css";
import clsx from "clsx";

const CalendarItem = ({ index, percentage, isActive, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          css.baseDay,
          percentage === "100" ? css.waterCompleted : css.day,
          isActive && css.active
        )}
      >
        {index + 1}
      </button>
      <div>{percentage}%</div>
    </>
  );
};

export default CalendarItem;
