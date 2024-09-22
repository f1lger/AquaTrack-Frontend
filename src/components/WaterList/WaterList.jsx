import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";

function WaterList({ entries }) {
  return (
    <ul className={css.list}>
      <p>water item</p>
      {/* {entries.map((data, index) => (
        <WaterItem key={index} data={data} />
      ))} */}
    </ul>
  );
}

export default WaterList;
