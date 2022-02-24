import styled from "styled-components";

const Button = styled.button`
  transition: all 200ms linear;
  background-color: rgba(4, 136, 237, 0.08);
  border: 1px solid #0488ed;
  color: #0488ed;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
  i {
    transition: all 200ms linear;
  }
  &:hover {
    background-color: rgba(255, 189, 13, 0.1);
    border: 1px solid #ffbd0d;
    color: #ffbd0d;
    cursor: pointer;
    transform: scale(1.05);
    i {
      color: #ffbd0d;
    }
  }
`;

export default Button;
