

import PropTypes from 'prop-types';
import css from "./ModalBtn.module.css";

export const ModalBtn = ({ text, onClick }) => {
  const getButtonClass = () => {
    if (text === "Save") return css.saveBtn;
    if (text === "Log out") return css.logOutBtn;
    if (text === "Cancel") return css.cancelBtn;
    if (text === "Delete") return css.logOutBtn;
    return "";
  };

  return (
    <button className={getButtonClass()} onClick={onClick} type="submit">
      <p
        className={
          text === "Save" || text === "Log out" || text === "Delete"
            ? css.saveBtnText
            : css.cancelBtnText
        }
      >
        {text}
      </p>
    </button>
  );
};

ModalBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


/*
import PropTypes from 'prop-types';
import css from "./ModalBtn.module.css";

export const ModalBtn = ({ text, onClick, type = "button" }) => {
  const getButtonClass = () => {
    switch (text) {
      case "Save":
        return css.saveBtn;
      case "Log out":
        return css.logOutBtn;
      case "Cancel":
        return css.cancelBtn;
      case "Delete":
        return css.logOutBtn; 
      default:
        return "";
    }
  };

  const getTextClass = () => {
    return ["Save", "Log out", "Delete"].includes(text)
      ? css.saveBtnText
      : css.cancelBtnText;
  };

  return (
    <button className={getButtonClass()} onClick={onClick} type={type}>
      <p className={getTextClass()}>{text}</p>
    </button>
  );
};

ModalBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]), 
}; */
