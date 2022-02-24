import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { CSSTransition } from "react-transition-group";
import StyledOverlay from "../../styles/styledComponents/Layout/StyledOverlay";
import styles from "../../styles/transitions.module.scss";
const Overlay: React.FC = () => {
  const uiSlice = useSelector((state: RootState) => state.ui);

  return (
    <CSSTransition
      in={uiSlice.showOverlay.show}
      timeout={200}
      unmountOnExit
      classNames={{
        enter: styles.fadeEnter,
        enterActive: styles.fadeEnterActive,
        exit: styles.fadeExit,
        exitActive: styles.fadeExitActive,
      }}
    >
      <StyledOverlay mobile={uiSlice.showOverlay.mobile} />
    </CSSTransition>
  );
};

export default Overlay;
