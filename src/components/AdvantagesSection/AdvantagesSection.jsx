import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/auth/operations";
import {
  selectTotalUsers,
  selectAuthLoading,
} from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

import womanAvatar1x from "../../photo/mob/woman-avatar@1x.webp";
import womanAvatar2x from "../../photo/mob/woman-avatar@2x.webp";

import manAvatar1x from "../../photo/mob/man-avatar@1x.webp";
import manAvatar2x from "../../photo/mob/man-avatar@2x.webp";

import girlAvatar1x from "../../photo/mob/girl-avatar@1x.webp";
import girlAvatar2x from "../../photo/mob/girl-avatar@2x.webp";

import styles from "./AdvantagesSection.module.css";

import { useTranslation } from 'react-i18next';

function AdvantagesSection() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const totalUsers = useSelector(selectTotalUsers);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!totalUsers && !loading) {
      dispatch(getAllUsers());
    }
  }, [dispatch, totalUsers, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainImg} />
      <div className={styles.customersContainer}>
        <div className={styles.customersAvatars}>
          <img
            src={womanAvatar1x}
            srcSet={`${womanAvatar2x} 2x`}
            alt="Woman avatar"
            height="28"
            className={styles.avatar}
          />
          <img
            src={manAvatar1x}
            srcSet={`${manAvatar2x} 2x`}
            alt="Man avatar"
            height="28"
            className={styles.avatar}
          />
          <img
            src={girlAvatar1x}
            srcSet={`${girlAvatar2x} 2x`}
            alt="Second woman avatar"
            height="28"
            className={styles.avatar}
          />
        </div>
        <p>
          {i18n.language === 'en' ? t("advantages.our") : null}
          {i18n.language === 'en' ? <br /> : null}
          <span className={styles.accent}>{totalUsers} {t("advantages.happy")} </span>
           {t("advantages.customers")}
        </p>
      </div>
      <ul className={styles.infoContainer}>
        <li className={styles.habit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#9BE1A0" />
          </svg>
          {t("advantages.habit_drive")}
        </li>
        <li className={styles.statistics}>{t("advantages.view_statistics")}</li>
        <li className={styles.rate}>{t("advantages.personal_rate")}</li>
      </ul>
    </div>
  );
}

export default AdvantagesSection;
