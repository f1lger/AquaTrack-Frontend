import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";

export default function WaterModal({
  title,
  secondTitle,
  onClose,
  isAddWater,
  item,
}) {
  return (
    <div className={css.waterModal}>
      <div className={css.waterTitle}>
        <h2 className={css.modalTitle}>{title}</h2>
      </div>
      <p className={css.modalValue}>{secondTitle}</p>
      <WaterForm
        closeWaterModal={onClose}
        isAddWater={isAddWater}
        item={item}
      />
    </div>
  );
}
