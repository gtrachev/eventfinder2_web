import styled from "styled-components";

const EventCard = styled.div<{ size: string }>`
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  .eventHeader {
    display: flex;
    align-items: center;
    .profileImgContainer {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      margin-right: 1rem;
    }
  }
  .eventCardImageContainer {
    height: ${({ size }) =>
      size === "big" ? "350px" : size === "small" ? "300px" : "220px"};
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .textContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1030px) {
    .eventCardImageContainer {
      height: ${({ size }) => (size === "big" ? "300px" : "250px")};
    }
  }
  @media (max-width: 950px) {
    .eventCardImageContainer {
      height: ${({ size }) => (size === "big" ? "300px" : "400px")};
    }
  }
  @media (max-width: 700px) {
    .eventCardImageContainer {
      height: 300px;
    }
  }
  @media (max-width: 500px) {
    margin-bottom: 0.5rem;
    .eventCardImageContainer {
      height: 200px;
    }
    h1 {
      font-size: 1.4rem;
    }
    h3 {
      font-size: 1.1rem;
    }
  }
`;

export default EventCard;
