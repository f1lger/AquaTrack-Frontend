import css from "./CalendarItem.module.css";
import clsx from "clsx";

const CalendarItem = ({ index, percentage }) => {
  return (
    <div>
      <button
        className={clsx(
          css.baseDay,
          percentage === "100" ? css.waterCompleted : css.day
        )}
      >
        {index + 1}
      </button>
      <div>{percentage}%</div>
    </div>
  );
};

export default CalendarItem;
