import AddDailyWaterBtn from "../AddDailyWaterBtn/AddDailyWaterBtn";
import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";

const DailyInfo = ({ openWaterModal }) => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.title}>
          <ChooseDate />
          {/* <p>Today</p> */}
          <AddDailyWaterBtn openWaterModal={openWaterModal} />
        </div>
        <WaterList />
      </div>
    </section>
  );
};

export default DailyInfo;

{
  /* <Modal isOpen={isWaterModalOpen} onClose={closeWaterModal}>
  <WaterModal
    title={"Add water"}
    secondTitle={"Correct entered data:"}
    onClose={closeWaterModal}
    isAddWater={true}
  />
</Modal>; */
}
