import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

const WaterMainInfo = () => {
  return (
    <div>
      <h2>Water Main Info</h2>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
