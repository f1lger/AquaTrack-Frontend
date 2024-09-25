import { useState } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Modal from "../../components/Modal/Modal.jsx";
import WaterModal from "../../components/WaterModal/WaterModal";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";
import { isToday } from "date-fns";
import { selectSelectedDate } from "../../redux/water/selectors.js";
import { useSelector } from "react-redux";
import DenyAddWaterModal from "../../components/AddDailyWaterBtn/DenyAddWaterModal/DenyAddWaterModal.jsx";

const TrackerPage = () => {
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isDenyAddWaterModalOpen, setIsDenyAddWaterModalOpen] = useState(false);

  const selectedDate = useSelector(selectSelectedDate);
  const isAllowedDate = () => {
    const today = new Date().toISOString().split("T")[0];
    const allowedDay = today === selectedDate;

    return allowedDay;
  };

  const openWaterModal = () => {
    if (isAllowedDate()) {
      setIsWaterModalOpen(true);
    } else {
      setIsDenyAddWaterModalOpen(true);
    }
  };

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

      <Modal
        isOpen={isDenyAddWaterModalOpen}
        onClose={() => setIsDenyAddWaterModalOpen(false)}
      >
        <DenyAddWaterModal onClose={() => setIsDenyAddWaterModalOpen(false)} />
      </Modal>
    </div>
  );
};
export default TrackerPage;
