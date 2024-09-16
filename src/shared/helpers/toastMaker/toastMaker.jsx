import toast from "react-hot-toast";
import styles from "./toastMaker.module.css";
import Icon from "../../components/Icon/Icon";

export default function toastMaker(text, status) {
  switch (status) {
    case "succes":
      return toast((t) => (
        <div className={styles.toastContainer}>
          <Icon id="icon-water-bottle-green" className={styles.iconSucces} />
          <span className={styles.toastSucces}>{text}</span>
        </div>
      ));

    case "error":
      return toast((t) => (
        <div className={styles.toastContainer}>
          <Icon id="icon-water-bottle-red" className={styles.iconSucces} />
          <span className={styles.toastSucces}>{text}</span>
        </div>
      ));
  }
}
