import styled from "styled-components";

const MessageInput = styled.div`
  border-radius: 40px;
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #0488ed;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  textarea {
    flex-grow: 1;
    font-size: 1.3rem;
    border: none;
    margin-right: 1rem;
    overflow: hidden;
    min-height: 5px;
    max-height: 150px;
  }
  @media (max-width: 500px) {
    textarea {
      font-size: 1.1rem;
      padding: 0rem;
    }
  }
`;

export default MessageInput;
