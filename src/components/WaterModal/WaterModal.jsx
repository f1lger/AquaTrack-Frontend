import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";
import Modal from "../Modal/Modal"; 

// export default function WaterModal({ title, secondTitle, onClose, isAddWater, item }) {
//   return (
//     <div className={css.waterModal}>
//       <h2 className={css.modalTitle}>{title}</h2>
//       <p className={css.modalValue}>{secondTitle}</p>
//       <WaterForm
//         closeWaterModal={onClose}
//         isAddWater={isAddWater}
//         item={item}
//       />
//     </div>
//   );
// }


export default function WaterModal({
  waterModalOpen, closeWaterModal, isAddWater,
  item,
}) {
  const title =
  isAddWater === "add" ? "Add water" : "Edit the entered amount of water";
  const value =
  isAddWater === "add" ? "Choose a value:" : "Correct entered data:";

  return (
    <Modal isOpen={waterModalOpen} onClose={closeWaterModal}>
      <div className={css.waterModal}>
        <p className={css.modalTitle}>{title}</p>
        <p className={css.modalValue}>{value}</p>
         <WaterForm
          closeWaterModal={closeWaterModal}
          isAddWater={isAddWater}
          item={item}
        />
      </div>
    </Modal>
  );
};
