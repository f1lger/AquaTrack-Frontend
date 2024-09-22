import { useState } from "react";
import { format } from "date-fns";
// import Loader from "../../Loader/Loader";
import Icon from "../../Icon/Icon";
import WaterModal from "../../WaterModal/WaterModal";
import DeleteWaterModal from "../../DeleteWaterModal/DeleteWaterModal";

import css from "./WaterItem.module.css";

const WaterItem = ({ index, data }) => {
  console.log("data: ", data);
  console.log("index: ", index);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {isLoading && <Loader type="blue" />}

      <div className={css.item}>
        <Icon id="water-glass-fill" className={css.iconGlass} />
        <div className={css.water}>
          <p className={css.volume}>{`${data.amount}ml`}</p>
          <p className={css.time}>{`${format(
            new Date(data?.date.slice(0, -1)),
            "hh:mm a"
          )}`}</p>
        </div>
        <div className={css.edit}>
          <button type="button" onClick={handleEdit} className={css.btnEdit}>
            <Icon id="icon-pen" width="16" height="16" />
          </button>
          <button type="button" onClick={handleDelete} className={css.btnTrash}>
            <Icon id="icon-trash" width="16" height="16" />
          </button>
        </div>

        <DeleteWaterModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isOpen={isDeleteModalOpen}
          closeModal={handleCloseDeleteModal}
          id={water._id}
        />

        <WaterModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          id={water._id}
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
          type="edit"
          initialData={{
            amount: water.amount,
            time: format(new Date(water?.date.slice(0, -1)), "HH:mm"),
          }}
        />
      </div>
    </>
  );
};

export default WaterItem;
