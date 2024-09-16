import { useState, useEffect } from 'react';
import css from './LogOutModal.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/auth/operations';

export const LogOutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post('/users/logout');

      dispatch(logout());

      localStorage.clear();

      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);

      dispatch(logout());
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <>
      <button onClick={openModal} className={css.logOutButton}>
        Log Out
      </button>

      {isOpen && (
        <div className={`${css.modalOverlay} ${css.isOpen}`} onClick={handleOverlayClick}>
          <div className={css.LogOutModalContainer}>
            <svg
              className={css.closeButton}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="12"
              height="12"
              viewBox="0 0 50 50"
              onClick={closeModal} 
            >
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
            <h2 className={css.title}>Log out</h2>
            <p className={css.caption}>Do you really want to leave?</p>
            <button className={css.logButton} onClick={handleLogOut}>Log out</button>
            <button className={css.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
