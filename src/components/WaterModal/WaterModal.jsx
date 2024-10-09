import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";
import { useTranslation } from "react-i18next";

export default function WaterModal({
  title,
  secondTitle,
  onClose,
  isAddWater,
  item,
}) {
  const { t } = useTranslation();

  return (
    <div className={css.waterModal}>
      <div className={css.waterTitle}>
        <h2 className={css.modalTitle}>{t(title)}</h2>
      </div>
      <p className={css.modalValue}>{t(secondTitle)}</p>
      <WaterForm
        closeWaterModal={onClose}
        isAddWater={isAddWater}
        item={item}
      />
    </div>
  );
}
