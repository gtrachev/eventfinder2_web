import styled from "styled-components";

const SearchInput = styled.div<{ err: boolean }>`
  border-radius: 40px;
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #0488ed;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    flex-grow: 1;
    font-size: 1.3rem;
    border: none;
    margin-right: 1rem;
  }
`;

export default SearchInput;
