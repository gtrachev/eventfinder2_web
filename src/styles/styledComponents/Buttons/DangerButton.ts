import styled from "styled-components";

const DangerButton = styled.button`
  transition: all 200ms linear;
  background-color: rgba(252, 68, 69, 0.08);
  border: 1px solid #fc4445;
  color: #fc4445;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
  i {
    transition: all 200ms linear;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export default DangerButton;
