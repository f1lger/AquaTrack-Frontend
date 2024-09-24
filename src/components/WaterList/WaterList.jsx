import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { selectDailyRecords } from "../../redux/water/selectors";

function WaterList() {
  const dailyRecords = useSelector(selectDailyRecords);

  return (
    <ul className={css.list}>
      {dailyRecords.map((item) => (
        <WaterItem key={item._id} data={item} />
      ))}
    </ul>
  );
}

export default WaterList;
