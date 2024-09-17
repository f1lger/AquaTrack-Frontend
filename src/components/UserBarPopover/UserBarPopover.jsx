import clsx from "clsx";
import css from "./UserBarPopover.module.css";
export default function UserBarPopover({
  openModal,
  openLoguotModal,
  openSettingModal,
}) {
  return (
    <div className={clsx(css.UserBarPopover, openModal ? css.open : css.close)}>
      <div className={css.btnList}>
        <button type="button" onClick={openSettingModal}>
          Setting
        </button>
        <button type="button" onClick={openLoguotModal}>
          Log out
        </button>
      </div>
    </div>
  );
}
