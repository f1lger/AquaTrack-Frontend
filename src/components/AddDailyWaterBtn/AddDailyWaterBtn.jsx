import { useSelector } from "react-redux";
import css from "./AddDailyWaterBtn.module.css";
import { selectSelectedDate } from "../../redux/water/selectors";
import Modal from "../Modal/Modal";
import { useState } from "react";
import DenyAddWaterModal from "./DenyAddWaterModal/DenyAddWaterModal";

const AddDailyWaterBtn = ({ openWaterModal }) => {
  const [isDenyAddWaterModalOpen, setIsDenyAddWaterModalOpen] = useState(false);
  const handleDenyAddWater = ({}) => setIsDenyAddWaterModalOpen(true);
  const handleCloseDenyAddWaterModal = () => setIsDenyAddWaterModalOpen(false);

  // Function to check if the selected date is the current date
  const selectedDate = useSelector(selectSelectedDate);
  const checkDate = () => {
    const today = new Date().toISOString().split("T")[0];

    if (today !== selectedDate) {
      setIsDenyAddWaterModalOpen(true); // Show modal if the date is not the current date
    } else {
      setIsDenyAddWaterModalOpen(false); // Do nothing if the date is today
    }
    return;
  };

  return (
    <>
      <div className={css.wrapper}>
        <button
          type="button"
          className={css.plusBtn}
          onClick={(openWaterModal, checkDate)}
        >
          +
        </button>
        <p className={css.text}>Add water</p>
        <Modal
          isOpen={isDenyAddWaterModalOpen}
          onClose={handleCloseDenyAddWaterModal}
        >
          <DenyAddWaterModal onClose={handleCloseDenyAddWaterModal} />
        </Modal>
      </div>
    </>
  );
};

export default AddDailyWaterBtn;
