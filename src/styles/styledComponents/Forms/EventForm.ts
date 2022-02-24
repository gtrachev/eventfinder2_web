import styled from "styled-components";

const EventForm = styled.div`
  width: 65%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  border-radius: 10px;
  label,
  p {
    color: #0488ed;
    font-weight: 300;
    font-size: 1.3rem;
    display: inline-block;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }
`;

export default EventForm;
