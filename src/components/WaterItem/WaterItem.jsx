import css from "./WaterItem.module.css";
import iconSprite from "../../icons/symbol-defs.svg";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal.jsx";
import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal.jsx";

const WaterItem = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [operationType, setOperationType] = useState("edit");
  const onOpenWaterModal = (type) => {
    setOperationType(type);
    setShowWaterModal(true);
  };
  const onCloseWaterModal = () => {
    setShowWaterModal(false);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 

  return (
    <div className={css.container}>
      <svg
        className={css.iconGlass}
      >
        <use href={`${iconSprite}#icon-water-glass-fill`}></use>
      </svg>
      <div className={css.info}>
        <p className={css.ml}>
          {/* {data.waterVolume}  */}
          ml
        </p>
        <p className={css.time}>{/* {time} */}time</p>
      </div>
      <div className={css.iconsContainer}>
        <button className={css.button} onClick={() => onOpenWaterModal("edit")}>
          <svg
            className={css.icon}
         
          >
            <use href={`${iconSprite}#icon-pen`}></use>
          </svg>
  
        </button>
        <button className={css.button} onClick={() => openModal()}>
          <svg
            className={css.icon}
       
          >
            <use href={`${iconSprite}#icon-trash-desk`}></use>
          </svg>
  
        </button>
      </div>
      <DeleteWaterModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        //   waterId={data._id}
      />
      <WaterModal
        waterModalOpen={showWaterModal}
        closeWaterModal={onCloseWaterModal}
        isAddWater={operationType}
        //   item={data}
      />
    </div>
  );
};

export default WaterItem;
