import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { NavLink, useParams } from "react-router-dom";
import { ChatType, UserType } from "../../utils/types/modelTypes";
import styles from "../../styles/chat/_userChats.module.scss";

const ChatButton: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const { chat_id = "" } = useParams();
  const userSlice = useSelector((state: RootState) => state.users);
  return (
    <NavLink
      to={`/chats/${chat._id}`}
      className={`${styles.chatButton} ${
        chat_id === chat._id && styles.activeChatBtn
      }`}
      key={chat._id}
    >
      <div className={`mr-1 ${styles.profileImgContainer}`}>
        <img
          src={
            chat.type === "personal"
              ? chat.members.find(
                  (member: UserType) => member._id !== userSlice.currentUser._id
                )?.profileImage.path
              : chat.event.images[0].path
          }
          alt={
            chat.type === "personal"
              ? chat.members.find(
                  (member: UserType) => member._id !== userSlice.currentUser._id
                )?.profileImage.filename
              : chat.event.images[0].filename
          }
        />
      </div>
      <div
        className={`w-100 d-flex flex-column align-start ${styles.hideTablet}`}
      >
        <p className="secondary-text xs">
          {chat.type === "personal"
            ? chat.members.find(
                (member: UserType) => member._id !== userSlice.currentUser._id
              )?.username
            : chat.event.name}
        </p>
        <p className="gray-text word-break">
          {chat.messages.length
            ? chat.messages[chat.messages.length - 1].text.slice(0, 30)
            : ""}
        </p>
      </div>
    </NavLink>
  );
};

export default ChatButton;
