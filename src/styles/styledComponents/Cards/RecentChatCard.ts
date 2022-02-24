import styled from "styled-components";

const RecentChatCard = styled.div`
  margin-bottom: 1rem;
  .chatCardContainer {
    transition: all 200ms linear;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    border-radius: 10px;
    .profileImgContainer {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      margin-right: 0.5rem;
    }
    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
`;

export default RecentChatCard;
