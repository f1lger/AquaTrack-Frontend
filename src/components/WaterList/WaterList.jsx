import { useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import {
  selectCurrentDay,
  selectDailyRecords,
} from "../../redux/water/selectors";
import { useEffect } from "react";

function WaterList() {
  const currentDay = useSelector(selectCurrentDay);
  const dailyRecords = useSelector(selectDailyRecords);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   dispatch(fetchWater(currentDay));
  // }, [currentDay, dispatch]);

  return (
      <ul className={css.list}>
        {dailyRecords.map((item) => (
          <WaterItem key={item._id} data={item} />
        ))}
      </ul>
  );
}

export default WaterList;
