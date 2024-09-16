import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import "../../translate/index.js";

import styles from "../WaterItem/WaterItem.module.css";
import WaterModal from "../WaterModal/WaterModal.jsx";
import Modal from "../Modal/Modal.jsx";
// import DeleteWaterModal from " ";
import { selectDailyRecords } from "../../redux/water/selectors.js";
import Icon from "../../shared/Icon/icon.jsx";
import { unixParser } from "../../shared/helpers/validationsHelper.js";

export const WaterItem = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const [selectedWaterAmount, setSelectedWaterAmount] = useState(null);
  const [selectedWaterTime, setSelectedWaterTime] = useState(null);
  const { t, i18n } = useTranslation();

  const dataWaterOfDay = useSelector(selectDailyRecords);

  const handleOpenDeleteModal = (id) => {
    setSelectedWaterId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedWaterId(null);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id, amount, date) => {
    setIsEditModalOpen(true);
    setSelectedWaterId(id);
    setSelectedWaterAmount(amount);
    setSelectedWaterTime(date);
  };

  return (
    <>
      {dataWaterOfDay.length > 0 ? (
        <ul className={styles.water_list}>
          {dataWaterOfDay.map((water) => (
            <li key={water._id} className={styles.water_item}>
              <div className={styles.water_item_content}>
                <Icon
                  className={styles.icon_water_glass}
                  width={44}
                  height={45}
                  id="icon-water-glass-fill"
                />
                <div>
                  <strong>
                    {water.amount} {t("Water add")}
                  </strong>
                  <p className={styles.date}>{unixParser(water.date)}</p>
                </div>
                <div className={styles.container_buttons}>
                  <button
                    className={styles.editButton}
                    onClick={() =>
                      handleEdit(water._id, water.amount, water.date)
                    }
                  >
                    {" "}
                    <Icon
                      className={styles.svg_edit}
                      width={16}
                      height={16}
                      id="icon-pen"
                    />{" "}
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleOpenDeleteModal(water._id)}
                  >
                    {" "}
                    <Icon
                      className={styles.svg_delete}
                      width={16}
                      height={16}
                      id="icon-trash"
                    />{" "}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.container_without_water}>
          <Icon
            className={styles.icon_water_glass}
            width={44}
            height={45}
            id="icon-water-glass-fill"
          />
          <p
            className={clsx(css.text_, {
              [css.text_Ua]: i18n.language === "ua",
            })}
          >
            {t("Not found")}
          </p>
        </div>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        >
          <WaterModal
            operationType="edit"
            isOpen={setIsEditModalOpen}
            waterId={selectedWaterId}
            waterAmount={selectedWaterAmount}
            waterTime={selectedWaterTime}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DeleteWaterModal
            onClose={handleCloseDeleteModal}
            waterId={selectedWaterId}
          />
        </Modal>
      )}
    </>
  );
};
