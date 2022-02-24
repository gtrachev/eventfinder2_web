import styled from "styled-components";
const AuthCard = styled.div`
  transition: all 200ms linear;
  width: 28%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 1rem 0;
  .tierHeader {
    color: #ffffff;
    border-radius: 20px 20px 0 0;
    text-align: center;
    padding: 1.2rem;
  }
  .tierTextContainer {
    padding: 1.2rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    background-color: #003459;
    padding: 0.5rem;
    border-radius: 10px;
  }
  .s {
    font-size: 1.5rem;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 900px) {
    p {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 800px) {
    width: 60%;
    p {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 550px) {
    width: 90%;
  }
`;

export default AuthCard;
