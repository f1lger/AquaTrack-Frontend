import { useState } from "react";
import { format } from "date-fns";
// import Loader from "../../Loader/Loader";
import iconSprite from "../../icons/symbol-defs.svg";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";

import css from "./WaterItem.module.css";
import Loader from "../Loader/Loader";

const WaterItem = ({ data }) => {
  console.log("data: ", data);

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

        {/* <DeleteWaterModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isOpen={isDeleteModalOpen}
          closeModal={handleCloseDeleteModal}
          id={data._id}
        /> */}
        {/* 
        <WaterModal
          title={}
          secondTitle={}
          onClose={}
          isAddWater={}
          item={}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          id={data._id}
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
          type="edit"
          initialData={{
            amount: data.amount,
            time: format(new Date(data?.date.slice(0, -1)), "HH:mm"),
          }}
        />
         */}
      </div>
    </>
  );
};

export default WaterItem;
