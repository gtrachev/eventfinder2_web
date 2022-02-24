import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { uiActionTypes } from "../../utils/types/actionTypes/uiActionTypes";
import { RootState } from "../../redux/rootReducer";
import FlashMessage from "../../styles/styledComponents/Flash/FlashMessage";
import styles from "../../styles/transitions.module.scss";

const Flash: React.FC = () => {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state: RootState) => state.ui);
  const closeFlash = () => {
    dispatch({
      type: uiActionTypes.REMOVE_FLASH,
    });
  };

  return (
    <CSSTransition
      in={uiSlice.flash.message.length ? true : false}
      timeout={200}
      unmountOnExit
      classNames={{
        enter: styles.slideXEnter,
        enterActive: styles.slideXEnterActive,
        exit: styles.slideXExit,
        exitActive: styles.slideXExitActive,
      }}
    >
      <FlashMessage
        key={Math.floor(Math.random() * 100)}
        type={uiSlice.flash.type}
      >
        <h3>{uiSlice.flash.message}</h3>
        <button
          className="btn-transparent close-btn white-text"
          onClick={closeFlash}
        >
          <i className="fas fa-times s"></i>
        </button>
      </FlashMessage>
    </CSSTransition>
  );
};

export default Flash;
