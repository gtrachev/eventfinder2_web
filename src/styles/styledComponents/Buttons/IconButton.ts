import styled from "styled-components";

const IconButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  transition: all 200ms linear;
  i,
  p {
    transition: all 200ms linear;
  }
  &:hover {
    color: #ffbd0d;
    cursor: pointer;
    transform: scale(1.15);
    i,
    p {
      color: #ffbd0d;
    }
  }
`;

export default IconButton;
