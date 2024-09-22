import AddDailyWaterBtn from "../AddDailyWaterBtn/AddDailyWaterBtn";
// import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";

const DailyInfo = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.title}>
          {/* <ChooseDate /> */}
          <p>Today</p>
          <AddDailyWaterBtn />
        </div>
        <WaterList />
      </div>
    </section>
  );
};

export default DailyInfo;
