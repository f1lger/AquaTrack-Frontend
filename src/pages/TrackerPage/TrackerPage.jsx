import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDailyNorma from "../../components/WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../../components/WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../../components/AddWaterBtn/AddWaterBtn";

const TrackerPage = () => {
  return (
    <div>
      <h1>Your tracker page</h1>
      <WaterMainInfo
        WaterDailyNorma={<WaterDailyNorma />}
        WaterProgressBar={<WaterProgressBar />}
        AddWaterBtn={<AddWaterBtn />}
      />
    </div>
  );
};
export default TrackerPage;
