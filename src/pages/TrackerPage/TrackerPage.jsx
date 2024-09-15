import { useState } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import ModalCont from "../../components/ModalCont/Modal";

const TrackerPage = () => {
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openWaterModal = () => setIsWaterModalOpen(true);
  const closeWaterModal = () => setIsWaterModalOpen(false);

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <div>
      <WaterMainInfo openWaterModal={openWaterModal} />
      <ModalCont
        isOpen={isWaterModalOpen}
        onClose={closeWaterModal}
      ></ModalCont>
      <ModalCont isOpen={isUserModalOpen} onClose={closeUserModal}></ModalCont>
      <ModalCont isOpen={isAuthModalOpen} onClose={closeAuthModal}></ModalCont>
    </div>
  );
};
export default TrackerPage;
