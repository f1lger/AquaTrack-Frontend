import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import styles from "../WaterStatistic/WaterStatistic.module.css";
import { useSelector } from "react-redux";
import {
  selectCurrentDay,
  selectMonthlyRecords,
} from "../../redux/water/selectors.js";
import { useEffect, useState } from "react";
import { getDayWaterAmount } from "../../API/apiOperations.js";
import WaterLoader from "../../shared/components/WaterLoader/WaterLoader.jsx";

export default function WaterStatistic() {
  const montWater = useSelector(selectMonthlyRecords);
  const activeDay = useSelector(selectCurrentDay);
  const [dayList, setDayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDayList = async () => {
    setIsLoading(true);
    const activeDate = new Date(activeDay).getDate();
    let formatedDayList = [];
    if (activeDate - 7 >= 0) {
      const dayList = montWater.slice(activeDate - 7, activeDate);
      dayList.map((day) => {
        const date = new Date(day.dateParam).getDate();
        const ml = day.totalDayWater;
        const dayInfo = { day: date, ml: ml };
        formatedDayList.push(dayInfo);
      });
      setIsLoading(false);
      return formatedDayList;
    } else {
      const unixDay = 1000 * 60 * 60 * 24;
      let fetchDay = new Date(activeDay).getTime();
      for (let index = 0; index < 7; index++) {
        const response = await getDayWaterAmount(fetchDay);
        const dayInfo = {
          day: new Date(response.data.date).getDate(),
          ml: response.data.totalDayWater,
        };
        formatedDayList.push(dayInfo);
        fetchDay = fetchDay - unixDay;
      }
      setIsLoading(false);
      return formatedDayList.reverse();
    }
  };

  useEffect(() => {
    console.log(dayList);
  }, [dayList]);

  useEffect(() => {
    const fetchDayList = async () => {
      const response = await getDayList();
      setDayList(response);
    };
    fetchDayList();
  }, []);

  const screenWidth = window.screen.width;
  const getStaticWidth = (screenWidth) => {
    if (screenWidth >= 768) {
      return 640;
    }
    if (screenWidth >= 1440) {
      return 608;
    }
    return 304;
  };

  const CustomizedDot = (props) => {
    const { cx, cy } = props;

    return (
      <foreignObject x={cx - 10.5} y={cy - 10.5} width={21} height={21}>
        <span className={styles.customDot}></span>
      </foreignObject>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <foreignObject
        className={styles.Ytext}
        x={x - 40}
        y={y}
        width={32}
        height={23}
      >
        <span>{`${payload.value / 1000} L`}</span>
      </foreignObject>
    );
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <foreignObject
        className={styles.Xtext}
        x={x}
        y={y}
        width={20}
        height={23}
      >
        <span>{payload.value}</span>
      </foreignObject>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customToolTipWrapper}>
          <div className={styles.customToolTip}>
            <p className={styles.toolTipText}>{`${payload[0].value} ml`}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.staticContainer}>
      {isLoading && <WaterLoader />}
      <AreaChart
        width={getStaticWidth(screenWidth)}
        height={274}
        data={dayList}
        margin={{ top: 10 }}
      >
        <defs>
          <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#87d28d" stopOpacity={1} />
            <stop offset="95%" stopColor="#87d28d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          strokeWidth={0}
          dataKey="day"
          padding={{ left: 10, right: 20 }}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          strokeWidth={0}
          tick={<CustomYAxisTick />}
          padding={{ bottom: 20, top: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="linear"
          dataKey="ml"
          strokeWidth={3}
          stroke="#87d28d"
          fillOpacity={1}
          fill="url(#colorL)"
          dot={<CustomizedDot />}
        />
      </AreaChart>
    </div>
  );
}
