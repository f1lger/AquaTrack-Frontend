import { useState } from "react";
import { format } from "date-fns";
import iconSprite from "../../icons/symbol-defs.svg";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

import css from "./WaterItem.module.css";
import Modal from "../Modal/Modal";

const WaterItem = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleDelete = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <div className={css.item}>
        <svg className={css.iconGlass}>
          <use href={`${iconSprite}#icon-water-glass-fill`}></use>
        </svg>
        <div className={css.water}>
          <p className={css.volume}>{`${data.amount}ml`}</p>
          <p className={css.time}>{`${format(
            new Date(data?.date.slice(0, -1)),
            "hh:mm a"
          )}`}</p>
        </div>
        <div className={css.edit}>
          <button type="button" onClick={handleEdit} className={css.btnEdit}>
            <svg className={css.iconEdit}>
              <use href={`${iconSprite}#icon-pen`}></use>
            </svg>
          </button>
          <button type="button" onClick={handleDelete} className={css.btnTrash}>
            <svg className={css.iconTrash}>
              <use href={`${iconSprite}#icon-trash`}></use>
            </svg>
          </button>
        </div>
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DeleteWaterModal
            closeModal={handleCloseDeleteModal}
            waterId={data._id}
          />
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <WaterModal
            title={"Edit the entered amount of water"}
            secondTitle={"Correct entered data:"}
            onClose={handleCloseEditModal}
            isAddWater={false}
            item={data}
          />
        </Modal>
      </div>
    </>
  );
};

export default WaterItem;
