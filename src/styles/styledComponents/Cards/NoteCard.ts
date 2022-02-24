import styled from "styled-components";

const NoteCard = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  .noteHeader {
    display: flex;
    align-items: center;
    .profileImgContainer {
      width: 80px;
      height: 80px;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      margin-right: 1rem;
    }
    .optionsBtn {
      position: absolute;
      top: 1rem;
      right: .5rem;
    }
  }
  @media (max-width: 650px) {
    margin-bottom: 0.5rem;
    h1,
    h2 {
      font-size: 1.4rem;
    }
    h3 {
      font-size: 1.1rem;
    }
    .noteHeader {
      .profileImgContainer {
        width: 60px;
        height: 60px;
      }
    }
  }
`;

export default NoteCard;
