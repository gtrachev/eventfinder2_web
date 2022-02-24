import styled from "styled-components";

interface StyledOverlayProps {
  readonly mobile: boolean;
}

const StyledOverlay = styled.div<StyledOverlayProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.8);
  @media (min-width: 720px) {
    ${({ mobile }) => mobile && "display: none;"}
  }
`;

export default StyledOverlay;
