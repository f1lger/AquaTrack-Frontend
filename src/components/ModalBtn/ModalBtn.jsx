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

// Додаємо валідацію пропсів
ModalBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

