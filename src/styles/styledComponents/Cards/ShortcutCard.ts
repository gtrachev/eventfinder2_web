import styled from "styled-components";

const ShortcutCard = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: transparent;
  transition: all 200ms linear;
  margin-bottom: 1rem;
  display: flex;
  padding: 0.8rem;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: #003459;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export default ShortcutCard;
