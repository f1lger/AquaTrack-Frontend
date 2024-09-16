import { WaterDetailedInfo } from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Modal from "../../components/Modal/Modal.jsx";
import WaterModal from "../../components/WaterModal/WaterModal";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";

const TrackerPage = () => {
  return (
<<<<<<< Updated upstream
    <div>
      <WaterMainInfo openWaterModal={openWaterModal} />

      <WaterDetailedInfo />

      <Modal isOpen={isWaterModalOpen} onClose={closeWaterModal}>
        <WaterModal
          title={"Add water"}
          secondTitle={"Correct entered data:"}
          onClose={() => closeWaterModal}
          isAddWater={true}
        />
      </Modal>

      <Modal isOpen={isUserModalOpen} onClose={closeUserModal}></Modal>

      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}></Modal>
=======
    <div className={styles.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
>>>>>>> Stashed changes
    </div>
  );
};
export default TrackerPage;
