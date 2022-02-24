import styled from "styled-components";

const TextInput = styled.textarea<{ err: boolean }>`
  width: 100%;
  padding: 0.3rem 0.5rem;
  ${({ err }) => err && "background-color: rgba(252, 68, 69, .2)"};
  border: 0.5px solid ${({ err }) => (err ? "#fc4445" : "rgb(160, 160, 160)")};
  border-top: none;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;

export default TextInput;
