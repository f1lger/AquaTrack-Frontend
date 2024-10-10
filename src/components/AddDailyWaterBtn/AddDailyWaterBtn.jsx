import PropTypes from "prop-types";
import css from "./AddDailyWaterBtn.module.css";
import { useTranslation } from "react-i18next";

const AddDailyWaterBtn = ({ openWaterModal }) => {
  const { t } = useTranslation();

  return (
    <div className={css.wrapper}>
      <button type="button" className={css.plusBtn} onClick={openWaterModal}>
        + 
      </button>
      <p className={css.text}>{t("add_water")}</p>
    </div>
  );
};


AddDailyWaterBtn.propTypes = {
  openWaterModal: PropTypes.func.isRequired,
};

export default AddDailyWaterBtn;
