import styles from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  return (
    <>
      <div className={styles.normaWrapper}>
        <p className={styles.normaValue}>1.5 L</p>
        <p className={styles.normaDesc}>My daily norma</p>
      </div>
    </>
  );
};

export default WaterDailyNorma;
