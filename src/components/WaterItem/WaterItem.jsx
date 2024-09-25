import { useState } from "react";
import { format, formatDate, parseISO } from "date-fns";
import iconSprite from "../../icons/symbol-defs.svg";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import DenyUpdateModal from "./DenyUpdateModal/DenyUpdateModal";

import css from "./WaterItem.module.css";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "../../redux/water/selectors";

const WaterItem = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDenyUpdateModalOpen, setIsDenyUpdateModalOpen] = useState(false);

  const handleEdit = () => {
    if (isAllowedDate()) {
      setIsEditModalOpen(true);
    } else {
      setIsDenyUpdateModalOpen(true);
    }
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleDelete = () => {
    if (isAllowedDate()) {
      setIsDeleteModalOpen(true);
    } else {
      setIsDenyUpdateModalOpen(true);
    }
  };
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDenyUpdate = ({}) => setIsDenyUpdateModalOpen(true);
  const handleCloseDenyUpdateModal = () => setIsDenyUpdateModalOpen(false);

  // Function to check if the selected date is the current date
  const selectedDate = useSelector(selectSelectedDate);
  const isAllowedDate = () => {
    const today = new Date().toISOString().split("T")[0];
    const allowedDay = today === selectedDate;

    return allowedDay;
  };

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

        <Modal
          isOpen={isDenyUpdateModalOpen}
          onClose={handleCloseDenyUpdateModal}
        >
          <DenyUpdateModal onClose={handleCloseDenyUpdateModal} />
        </Modal>
      </div>
    </>
  );
};

export default WaterItem;
