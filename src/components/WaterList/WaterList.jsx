import { useDispatch, useSelector } from "react-redux";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import {
  selectDailyRecords,
  selectSelectedDate,
} from "../../redux/water/selectors";
import { useEffect } from "react";
import { fetchWater } from "../../redux/water/operations";

function WaterList() {
  const selectedDay = useSelector(selectSelectedDate);
  const dailyRecords = useSelector(selectDailyRecords);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWater(selectedDay));
  }, [selectedDay, dispatch]);

  return (
    <ul className={css.list}>
      {dailyRecords.map((item) => (
        <WaterItem key={item._id} data={item} />
      ))}
    </ul>
  );
}

export default WaterList;
