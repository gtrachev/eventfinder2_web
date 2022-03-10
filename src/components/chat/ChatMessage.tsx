import React from "react";
import { NavLink } from "react-router-dom";
import { MessageType } from "../../utils/types/modelTypes";
import TimeAgo from "timeago-react";
import styles from "../../styles/chat/_userChats.module.scss";

const ChatMessage: React.FC<{
  chatMessage: MessageType;
  isAuthor: boolean;
}> = ({ chatMessage, isAuthor }) => {
  return isAuthor ? (
    <div
      data-testid={`messageAuthor${chatMessage._id}`}
      className={`${styles.message} ${styles.owned}`}
    >
      <div className={styles.chatText}>{chatMessage.text}</div>
      <div className={styles.profileImgContainer}>
        <img
          src={chatMessage.author.profileImage.path}
          alt={chatMessage.author.profileImage.filename}
        />
      </div>
      <TimeAgo className={styles.createdAt} datetime={chatMessage.createdAt} />
    </div>
  ) : (
    <div
      data-testid={`messageNotAuthor${chatMessage._id}`}
      className={`${styles.message}`}
    >
      <NavLink to={`/account/${chatMessage.author._id}`}>
        <div className={styles.profileImgContainer}>
          <img
            src={chatMessage.author.profileImage.path}
            alt={chatMessage.author.profileImage.filename}
          />
        </div>
      </NavLink>
      <div className={`${styles.chatText} bg-secondary`}>
        {chatMessage.text}
      </div>
      <TimeAgo className={styles.createdAt} datetime={chatMessage.createdAt} />
    </div>
  );
};

export default ChatMessage;
