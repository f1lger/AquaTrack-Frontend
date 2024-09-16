import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Icon from "../Icon/Icon.jsx";
import { selectCurrentDay } from "../../../redux/water/selectors.js";
import toastMaker from "../../helpers/toastMaker/toastMaker.jsx";
import "../../../translate/index.js";
import Modal from "../../../components/Modal/Modal";
import styles from "../AddWaterBtn/AddWaterBtn.module.css";

export const AddWaterBtn = ({ WaterDetailedInfoStyles, addForCurrentDay }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t, i18n } = useTranslation();
  const currentDay = useSelector(selectCurrentDay);

  const handleOpenModal = () => {
    if (addForCurrentDay) {
      if (new Date(currentDay).getTime() > new Date().getTime()) {
        toastMaker("You can't add water to the future day", "error");
        return;
      }
    }
    setIsOpenModal(true);
  };
  return (
    <>
      <button
        className={clsx(
          css.btn,
          WaterDetailedInfoStyles && styles.addBtnStyle,
          {
            [css.btnUa]: i18n.language === "ua",
          }
        )}
        type="button"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Icon
          className={clsx(
            css.icon,
            WaterDetailedInfoStyles && styles.addIconStyle
          )}
          width="16"
          height="16"
          id="icon-plus"
        />
        {t("Add water")}
      </button>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <WaterModal
            operationAdd={true}
            operationType="add"
            isOpen={setIsOpenModal}
            addForCurrentDay={addForCurrentDay}
          />
        </Modal>
      )}
    </>
  );
};
