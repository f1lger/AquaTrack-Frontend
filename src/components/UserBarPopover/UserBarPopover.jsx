import clsx from "clsx";
import css from "./UserBarPopover.module.css";
export default function UserBarPopover({ openModal }) {
  return (
    <div
      className={clsx(css.UserBarPopover, openModal ? css.open : css.close)}
    >
      <div className={css.btnList}>
        <button type="button">Setting</button>
        <button type="button">Log out</button>
      </div>
    </div>
  );
}
