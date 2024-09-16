import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import ChooseDate from "../ChooseDate/ChooseDate";
import Modal from "../Modal/Modal";
import WaterModal from "../WaterModal/WaterModal";

import styles from "../DailyInfo/DailyInfo.module.css";
import WaterList from "../WaterList/WaterList";

const DailyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.container_daily_info}>
        <ChooseDate />
        <AddWaterBtn WaterDetailedInfoStyles={true} addForActiveDay={true} />
      </div>

      {isOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )}
      <WaterList />
    </div>
  );
};

export default DailyInfo;
