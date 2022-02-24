import styled from "styled-components";

const ErrorCard = styled.div`
  background: rgba(252, 68, 69, 0.8);
  border: 1px solid #fc4445;
  border-radius: 10px;
  font-size: 1.5rem;
  padding: 1rem;
  color: #ffffff;
  text-align: center;
  @media (max-width: 800px) {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 500px) {
    width: 100%;
    font-size: 1.3rem;
    padding: .5rem;
  }
`;

export default ErrorCard;
