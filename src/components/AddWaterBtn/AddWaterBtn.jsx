import styles from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const AddWaterBtn = ({ openWaterModal }) => {
  const { t } = useTranslation();

  return (
    <button type="button" className={styles.addBtn} onClick={openWaterModal}>
      <FaPlus className={styles.iconPlus} />
      {t("add_water")}
    </button>
  );
};

AddWaterBtn.propTypes = {
  openWaterModal: PropTypes.func.isRequired,
};
export default AddWaterBtn;