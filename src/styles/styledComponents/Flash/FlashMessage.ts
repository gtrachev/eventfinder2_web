import styled from "styled-components";

interface FlashMessageProps {
  readonly type: string;
}

const FlashMessage = styled.div<FlashMessageProps>`
  max-width: 1300px;
  width: 100%;
  background: ${(props) =>
    props.type === "error"
      ? "rgba(252, 68, 69, .7)"
      : props.type === "success" && "rgba(21, 219, 149, .7)"};
  color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.2rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  .close-btn {
    &:hover {
      color: #333;
    }
  }
`;

export default FlashMessage;
