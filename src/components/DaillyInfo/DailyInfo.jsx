import ChooseDate from "../DailyInfo/ChooseDate/ChooseDate.jsx";
import AddWaterDailyBtn from "./AddWaterDailyBtn/AddWaterDailyBtn.jsx";
import css from "./DailyInfo.module.css";
import WaterList from "./WaterList/WaterList";

const DailyInfo = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.title}>
          <ChooseDate />
          <AddWaterDailyBtn />
        </div>
        <WaterList />
      </div>
    </section>
  );
};

export default DailyInfo;
