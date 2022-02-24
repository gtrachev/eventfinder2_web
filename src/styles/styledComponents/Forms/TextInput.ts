import styled from "styled-components";

const TextInput = styled.input<{ err: boolean }>`
  width: 100%;
  padding: 0.3rem 0.5rem;
  border: none;
  ${({ err }) => err && "background-color: rgba(252, 68, 69, .2)"};
  border-bottom: 0.5px solid
    ${({ err }) => (err ? "#fc4445" : "rgba(160, 160, 160)")};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;

export default TextInput;
