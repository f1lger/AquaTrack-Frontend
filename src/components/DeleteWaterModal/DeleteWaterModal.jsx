import { useDispatch, useSelector } from "react-redux";
import { deleteWater, waterPerMonth } from "../../redux/water/operations";
import { selectedDate, selectWaterLoading } from "../../redux/water/selectors";
import css from "./DeleteWaterModal.module.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const DeleteWaterModal = ({ closeModal, waterId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectWaterLoading);
  const selectedDay = useSelector(selectedDate);
  const selectedMonth = selectedDay.split("-");

  const handleDelete = () => {
    dispatch(deleteWater(waterId))
      .unwrap()
      .then(() => {
        dispatch(waterPerMonth(`${selectedMonth[0]}-${selectedMonth[1]}`));
        toast.success(t("delete_water_modal.successfully_deleted"));
        closeModal();
      })
      .catch((error) => {
        toast.error(`${t("delete_water_modal.something_wrong")}: ${error.message}`);
      });
  };

  const buttonColorClass = `${css.btn} ${css.btnColor}`;
  const buttonCancelClass = `${css.btn} ${css.btnCancel}`;

  return (
    <div className={css.modal}>
      <h3 className={css.modalHead}>{t("delete_water_modal.delete_entry")}</h3>
      <p className={css.modalText}>
        {t("delete_water_modal.delete_confirmation")}
      </p>
      <div className={css.logOutButtons}>
        <button
          className={buttonColorClass}
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? t("delete_water_modal.deleting") : t("delete_water_modal.delete")}
        </button>
        <button className={buttonCancelClass} onClick={closeModal}>
          {t("delete_water_modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
