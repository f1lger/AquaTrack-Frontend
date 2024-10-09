import { useTranslation } from "react-i18next";
import { MdRadioButtonChecked } from "react-icons/md";
import { IoMdRadioButtonOff } from "react-icons/io";
import css from "./LanguageSwitcher.module.css";

import Flag from 'react-world-flags';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const selectedOption = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className={css.switcherContainer}>
      <label className={css.radioBtnLabel}>
        <input
          className={css.languageInput}
          type="radio"
          value="en"
          checked={selectedOption === "en"}
          onChange={() => changeLanguage("en")}
        />
        {selectedOption === "en" ? (
          <MdRadioButtonChecked
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        ) : (
          <IoMdRadioButtonOff
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        )}
      <Flag code="GB" onClick={() => changeLanguage('en')} style={{ width: "32px", height: "20px", cursor: 'pointer', marginLeft: "5px" }} />
      </label>
      <label className={css.radioBtnLabel}>
        <input
          className={css.languageInput}
          type="radio"
          value="ua"
          checked={selectedOption === "ua"}
          onChange={() => changeLanguage("ua")}
        />
        {selectedOption === "ua" ? (
          <MdRadioButtonChecked
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        ) : (
          <IoMdRadioButtonOff
            style={{ color: "#9be1a0", width: "20px", height: "20px" }}
          />
        )}
        <Flag code="UA" onClick={() => changeLanguage('ua')} style={{ width: '30px', height: '18px', cursor: 'pointer', marginLeft: "5px"}} />
      </label>
    </div>
  );
};
export default LanguageSwitcher;