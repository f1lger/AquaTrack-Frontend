import { useState } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Modal from "../../components/Modal/Modal.jsx";
import WaterModal from "../../components/WaterModal/WaterModal";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";

const TrackerPage = () => {
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);

  const openWaterModal = () => setIsWaterModalOpen(true);
  const closeWaterModal = () => setIsWaterModalOpen(false);

  return (
    <div className={css.trackerPage}>
      <WaterMainInfo openWaterModal={openWaterModal} />
      <WaterDetailedInfo openWaterModal={openWaterModal} />
      <Modal isOpen={isWaterModalOpen} onClose={closeWaterModal}>
        <WaterModal
          title={"Add water"}
          secondTitle={"Correct entered data:"}
          onClose={closeWaterModal}
          isAddWater={true}
        />
      </Modal>
    </div>
  );
};
export default TrackerPage;
