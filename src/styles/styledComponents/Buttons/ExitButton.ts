import styled from "styled-components";

const ExitButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 40px;
  width: 40px;
  border: 1px solid #fc4445;
  border-radius: 50%;
  background-color: rgba(252, 68, 69, 0.5);
  color: #ffffff;
  transition: all 200ms linear;
  &:hover {
    background: #fc4445;
    cursor: pointer;
  }
`;

export default ExitButton;
